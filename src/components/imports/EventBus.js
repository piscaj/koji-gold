import { useEffect, useState, useCallback } from "react";
import postal from "postal";

/*

* useDigitalState("Signal number/name as a string")
* useStringState("Signal number/name as a string")
* useAnalogState("Signal number as a number")

* usePublishDigitalState("Signal number/name as a string")
* usePublishDigitalLatch(signalName, value) 
* publishStringState("Signal number/name as a string")
* publishAnalogState("Signal number as a number")

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

export function usePublishDigital(signalName, delay) {
  if (delay === 0) {
    delay = 200;
  }
  return useCallback(() => {
    postal.publish({
      channel: "publish",
      topic: "component.publish",
      data: {
        type: "boolean",
        name: signalName,
        value: true,
      },
    });
    setTimeout(function () {
      postal.publish({
        channel: "publish",
        topic: "component.publish",
        data: {
          type: "boolean",
          name: signalName,
          value: false,
        },
      });
    }, delay);
  }, [delay, signalName]);
}

export function usePublishDigitalLatch(signalName, value) {
  return useCallback(() => {
    postal.publish({
      channel: "publish",
      topic: "component.publish",
      data: {
        type: "boolean",
        name: signalName,
        value: value,
      },
    });
  }, [signalName, value]);
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

export function usePublishString(signalName, value) {
  return useCallback(() => {
    postal.publish({
      channel: "publish",
      topic: "component.publish",
      data: {
        type: "string",
        name: signalName,
        value: value,
      },
    });
  }, [signalName, value]);
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

export function usePublishAnalog(signalName, value) {
  return useCallback(() => {
    postal.publish({
      channel: "publish",
      topic: "component.publish",
      data: {
        type: "number",
        name: signalName,
        value: value,
      },
    });
  }, [signalName, value]);
}
