/* eslint-disable no-restricted-globals */
import ReconnectingWebSocket from "reconnecting-websocket";

const socketUrl = process.env.REACT_APP_URL;
const store = [{ id: "null", value: "null", type: "null" }];

self.onmessage = ({ data }) => {
  if (data.message === "WSStart") {
    connect();
  }
};

const connect = () => {
  const crestronWS = new ReconnectingWebSocket(socketUrl);

  crestronWS.addEventListener("open", () => {
    self.postMessage({
      message: "OPEN",
    });
    crestronWS.send("get_json=all\x0d\x0a");
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
};
