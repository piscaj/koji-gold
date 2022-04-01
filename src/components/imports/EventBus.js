import { useEffect, useState, useCallback } from "react";
import postal from "postal";
import { useSelector } from "react-redux";

// "bool" (Digital) subscribe hook
function useSignalStateBool(signalName) {
  const feedbackStore = useSelector((state) => state.feedback.value);
  const [feedbackBool, setFeedbackBool] = useState();

  const checkStore = useCallback(
    (signalName) => {
      let foundIndexDigital = feedbackStore.findIndex(
        (x) => x.id === signalName
      );
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (signalName === null || signalName === undefined) {
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

// "string" subscribe hook
function useSignalStateString(signalName) {
  const feedbackStore = useSelector((state) => state.feedback.value);
  const [feedbackString, setFeedbackString] = useState();

  const checkStore = useCallback((signalName) => {
    let foundIndexSerial = feedbackStore.findIndex((x) => x.id === signalName);
    if (
      foundIndexSerial >= 0 &&
      feedbackStore[foundIndexSerial].type === "string"
    ) {
      postal.publish({
        channel: "string",
        topic: signalName,
        data: {
          value: feedbackStore[foundIndexSerial].value,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (signalName === "" || signalName === undefined) {
      return;
    }
    const subscriptionID = postal.subscribe({
      channel: "string",
      topic: signalName,
      callback: function (data, envelope) {
        setFeedbackString(data.value);
      },
    });
    checkStore(signalName);
    return () => {
      subscriptionID.unsubscribe();
    };
  }, [signalName, checkStore]);

  return feedbackString;
}

export function useStringState(signalName) {
  return useSignalStateString(signalName);
}

// "number" (Analog) subscribe
function useSignalStateNumber(signalName) {
  const feedbackStore = useSelector((state) => state.feedback.value);
  const [feedbackNumber, setFeedbackNumber] = useState();

  const checkStore = useCallback((signalName) => {
    let foundIndexNumber = feedbackStore.findIndex((x) => x.id === signalName);
    if (
      foundIndexNumber >= 0 &&
      feedbackStore[foundIndexNumber].type === "number"
    ) {
      postal.publish({
        channel: "number",
        topic: signalName,
        data: {
          value: feedbackStore[foundIndexNumber].value,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (signalName === null) {
      return;
    }
    const subscriptionID = postal.subscribe({
      channel: "number",
      topic: signalName,
      callback: function (data, envelope) {
        setFeedbackNumber(data.value);
      },
    });
    checkStore(signalName);
    return () => {
      subscriptionID.unsubscribe();
    };
  }, [signalName, checkStore]);

  return feedbackNumber;
}

export function useAnalogState(signalName) {
  return useSignalStateNumber(signalName, 0);
}
