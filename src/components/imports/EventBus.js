import { useEffect, useState, useCallback } from "react";
import postal from "postal";

/*
Hooks used to subrcribe/unsubscribe in a
pattern simmilar to the cr-com'lib, but using postal.js
* useDigitalState("Your signal number/name as a string")
* useStringState("Your signal number/name as a string")
* useAnalogState("Your signal number as a number")
*/

// "bool" (Digital) subscribe hook
function useSignalStateBool(signalName) {
  const [feedbackBool, setFeedbackBool] = useState();

  const checkStore = useCallback(
    (signalName) => {
      postal.publish({
        channel: "update",
        topic: "component.refresh",
        data: {
          value: signalName,
        },
      });
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
  const [feedbackString, setFeedbackString] = useState();

  const checkStore = useCallback((signalName) => {
    postal.publish({
      channel: "update",
      topic: "component.refresh",
      data: {
        value: signalName,
      },
    });
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
  const [feedbackNumber, setFeedbackNumber] = useState();

  const checkStore = useCallback((signalName) => {
    postal.publish({
      channel: "update",
      topic: "component.refresh",
      data: {
        value: signalName,
      },
    });
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
