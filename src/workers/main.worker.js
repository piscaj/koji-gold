/* eslint-disable no-restricted-globals */
import ReconnectingWebSocket from "reconnecting-websocket";

//Change IP in .env
const socketUrl = process.env.REACT_APP_URL;
const store = [];
var socketInstance = null;

//Process messages from main thread
self.onmessage = function (e) {
  const workerData = e.data;
  switch (workerData.connectionStatus) {
    //Start websocket connection
    case "init":
      if (socketInstance === null) {
        socketInstance = createSocketInstance();
        socketManagement();
      }
      break;
    //Stop websocket connection
    case "stop":
      socketInstance.close();
      break;

    default:
      socketManagement();
  }
  //Send state update to component
  if (workerData.componentUpdate) {
    broadcastUpdate(workerData.componentUpdate);
    //Send messages to websocket from main thread
  } else if (workerData.publishComponentMessage) {
    publishMessage(workerData.publishComponentMessage);
  }
};

//Process requsts from component to the API
function publishMessage(data) {
  if (data.type === "boolean") {
    data.value === true
      ? socketInstance.send(data.name + "=1\x0d\x0a")
      : socketInstance.send(data.name + "=0\x0d\x0a");
  } else if (data.type === "string") {
    socketInstance.send(data.name + "=" + data.value + "\x0d\x0a");
  } else if (data.type === "number") {
    //API not avalable yet
  }
}

//Process state update request from component
function broadcastUpdate(data) {
  var foundIndex = store.findIndex((x) => x.id === data);
  // Find the matching data value at id,
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
            //Find {empty} objects. We don't need them.
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
      postMessage({ message: "SOCKET-CLOSED" });
      if (event.wasClean) {
        postMessage(`[SOCKET] Connection closed, code=${event.code}`);
      } else {
        postMessage("[SOCKET] Connection failure");
      }
    };

    socketInstance.onerror = function (error) {
      //Capture any socket errors
      postMessage(`[SOCKET] Error : ${error.message}`);
      //socketInstance.close();
    };
  }
}

function createSocketInstance() {
  let socket = new ReconnectingWebSocket(socketUrl);
  return socket;
}
