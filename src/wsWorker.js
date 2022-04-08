/* eslint-disable no-restricted-globals */

import ReconnectingWebSocket from "reconnecting-websocket";

const socketUrl = process.env.REACT_APP_URL;
const store = [{ id: "null", value: "null", type: "null" }];

const connect = () => {
  const crestronWS = new ReconnectingWebSocket(socketUrl);

  const wsConnection = { crestronWS };

  crestronWS.addEventListener("open", () => {
    self.postMessage({
      message: "OPEN",
    });
    //crestronWS.send("get_json=all\x0d\x0a");
  });

  crestronWS.addEventListener("close", () => {
    self.postMessage({
      message: "CLOSE",
    });
  });

  crestronWS.addEventListener("message", (event) => {
    if (event.data === "HB") {
      crestronWS.send("ACK\x0d\x0a");
      console.log("Heartbeat sent");
    } else {
      let jsonObject = JSON.parse(event.data);

      if (jsonObject.fb_objects[0].type === "bool") {
        self.postMessage({
          message: "PUBLISH",
          channel: "boolean",
          topic: jsonObject.fb_objects[0].id,
          data: jsonObject.fb_objects[0].value,
        });
      } else if (jsonObject.fb_objects[0].type === "string") {
        self.postMessage({
          message: "PUBLISH",
          channel: "string",
          topic: jsonObject.fb_objects[0].id,
          data: jsonObject.fb_objects[0].value,
        });
      } else if (jsonObject.fb_objects[0].type === "number") {
        self.postMessage({
          message: "PUBLISH",
          channel: "number",
          topic: jsonObject.fb_objects[0].id,
          data: jsonObject.fb_objects[0].value,
        });
      }

      var foundIndex = store.findIndex(
        (x) => x.id === jsonObject.fb_objects[0].id
      );
      // If we have a matching element value at id, overwrite it
      if (foundIndex >= 0) {
        store[foundIndex].value = jsonObject.fb_objects[0].value;
      }
      // If we don't have a match lets push the element into the array
      else {
        store.push(jsonObject.fb_objects[0]);
      }
    }
  });

  crestronWS.addEventListener("error", () => {});

  return wsConnection;
};

self.onmessage = ({ data }) => {
  if (data.message === "WSStart") {
    var connection = connect();
  } else if (data.message === "Send") {
    connection.crestronWS.send(data.payload);
    self.postMessage({
      message: data.payload,
    });
  }
};
