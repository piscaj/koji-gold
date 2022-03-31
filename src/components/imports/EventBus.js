import postal from "postal";
import { useEffect, useState } from "react";

// "bool" (Digital) subscribe
function useSignalStateBool(signalName) {
  const [feedbackBool, setFeedbackBool] = useState();
  useEffect(() => {
    const subscriptionID = postal.subscribe({
      channel: "boolean",
      topic: signalName,
      callback: function (data, envelope) {
        setFeedbackBool(data.value);
      },
    });
    return () => {
      subscriptionID.unsubscribe();
    };
  }, [signalName]);
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
