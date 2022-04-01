import { useEffect, useState, useCallback } from "react";
import postal from "postal";
import { useSelector } from "react-redux";

// "bool" (Digital) subscribe
function useSignalStateBool(signalName) {
  const feedbackStore = useSelector((state) => state.feedback.value);
  const [feedbackBool, setFeedbackBool] = useState();

  const checkStore = useCallback((signalName) => {
    let foundIndexDigital = feedbackStore.findIndex((x) => x.id === signalName);
    if (
      foundIndexDigital >= 0 &&
      feedbackStore[foundIndexDigital].type === "bool"
    ) {
      postal.publish({
        channel: "boolean",
        topic: signalName,
        data: {
          value: feedbackStore[foundIndexDigital].value,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (signalName === null) {
      return;
    }
    const subscriptionID = postal.subscribe({
      channel: "boolean",
      topic: signalName,
      callback: function (data, envelope) {
        setFeedbackBool(data.value);
      },
    });
    checkStore(signalName);
    return () => {
      subscriptionID.unsubscribe();
    };
  }, [signalName, checkStore]);
  return feedbackBool;
}

export function useDigitalState(signalName) {
  return useSignalStateBool(signalName);
}

// "string" subscribe
function useSignalStateString(signalName) {
  const [feedbackString, setFeedbackString] = useState();
  useEffect(() => {
    const subscriptionID = postal.subscribe({
      channel: "string",
      topic: signalName,
      callback: function (data, envelope) {
        setFeedbackString(data.value);
      },
    });
    return () => {
      subscriptionID.unsubscribe();
    };
  }, [signalName]);

  return feedbackString;
}

export function useStringState(signalName) {
  return useSignalStateString(signalName);
}

// "number" (Analog) subscribe
function useSignalStateNumber(signalName) {
  const [feedbackNumber, setFeedbackNumber] = useState();
  useEffect(() => {
    const subscriptionID = postal.subscribe({
      channel: "number",
      topic: signalName,
      callback: function (data, envelope) {
        setFeedbackNumber(data.value);
      },
    });
    return () => {
      subscriptionID.unsubscribe();
    };
  }, [signalName]);

  return feedbackNumber;
}

export function useAnalogState(signalName) {
  return useSignalStateNumber(signalName, 0);
}
