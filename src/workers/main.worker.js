/* eslint-disable no-restricted-globals */
import ReconnectingWebSocket from "reconnecting-websocket";

const socketUrl = process.env.REACT_APP_URL;
const store = [];
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
  else if (workerData.componentUpdate) {
    broadcastUpdate(workerData.componentUpdate);
  } else if (workerData.publishComponentMessage) {
    publishMessage(workerData.publishComponentMessage);
  }
};

function publishMessage(data) {
  if (data.type === "boolean"){
    data.value === true ?
    socketInstance.send(data.name+"=1\x0d\x0a"):
    socketInstance.send(data.name+"=0\x0d\x0a")
  }
}

function broadcastUpdate(data) {
  var foundIndex = store.findIndex((x) => x.id === data);
  // If we have a matching element value at id,
  if (foundIndex >= 0) {
    postMessage({
      message: "STATE",
      channel:
        store[foundIndex].type === "bool" ? "boolean" : store[foundIndex].type,
      topic: store[foundIndex].id,
      data: store[foundIndex].value,
    });
  }
}

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
            //This is a fix for and {empty} objects. We don't need them.
          } else {
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
        }
        if (jsonObject.fb_objects[0].type === "bool") {
          postMessage({
            message: "STATE",
            channel: "boolean",
            topic: jsonObject.fb_objects[0].id,
            data: jsonObject.fb_objects[0].value,
          });
        } else if (jsonObject.fb_objects[0].type === "string") {
          postMessage({
            message: "STATE",
            channel: "string",
            topic: jsonObject.fb_objects[0].id,
            data: jsonObject.fb_objects[0].value,
          });
        } else if (jsonObject.fb_objects[0].type === "number") {
          postMessage({
            message: "STATE",
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
