/* eslint-disable no-restricted-globals */
import ReconnectingWebSocket from "reconnecting-websocket";

const socketUrl = process.env.REACT_APP_URL;
var socketInstance = null;

self.onmessage = function (e) {
  const workerData = e.data;
  switch (workerData.connectionStatus) {
    case "init":
      if (socketInstance === null) {
        socketInstance = createSocketInstance();
        socketManagement();
      }
      break;

    case "stop":
      socketInstance.close();
      break;

    default:
      socketManagement();
  }
  if (workerData.sendMessage) socketInstance.send(workerData.sendMessage);
};

function socketManagement() {
  if (socketInstance) {
    socketInstance.onopen = function (e) {
      postMessage("[SOCKET] Connection established");
      socketInstance.send("get_json=all\x0d\x0a");
      postMessage(`[SOCKET] Requsting full update from processor`);
      postMessage({ disableLoader: false });
      postMessage({ disableAlert: false });
    };

    socketInstance.onmessage = function (event) {
      if (event.data === "HB") {
        socketInstance.send("ACK\x0d\x0a");
        postMessage(`[SOCKET] Heartbeat sent`);
      } else {
        let jsonObject = JSON.parse(event.data);
        if (jsonObject !== null) {
          if (Object.keys(jsonObject).length === 0) {
            //This is a fix for the "HB".  This is not an object
            //lets not put any garbage in the store, pass if the json is empty {}
          } else {
            postMessage({
              message: "STORE",
              data: jsonObject.fb_objects[0],
            });
          }
        }
        if (jsonObject.fb_objects[0].type === "bool") {
          postMessage({
            message: "PUBLISH",
            channel: "boolean",
            topic: jsonObject.fb_objects[0].id,
            data: jsonObject.fb_objects[0].value,
          });
        } else if (jsonObject.fb_objects[0].type === "string") {
          postMessage({
            message: "PUBLISH",
            channel: "string",
            topic: jsonObject.fb_objects[0].id,
            data: jsonObject.fb_objects[0].value,
          });
        } else if (jsonObject.fb_objects[0].type === "number") {
          postMessage({
            message: "PUBLISH",
            channel: "number",
            topic: jsonObject.fb_objects[0].id,
            data: jsonObject.fb_objects[0].value,
          });
        }
      }
    };

    socketInstance.onclose = function (event) {
      if (event.wasClean) {
        postMessage(`[SOCKET] Connection closed cleanly, code=${event.code}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        postMessage("[SOCKET] Connection died");
      }
    };

    socketInstance.onerror = function (error) {
      postMessage(`[SOCKET] ${error.message}`);
      socketInstance.close();
    };
  }
}

function createSocketInstance() {
  let socket = new ReconnectingWebSocket(socketUrl);
  return socket;
}
