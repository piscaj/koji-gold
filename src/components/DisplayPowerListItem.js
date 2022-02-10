import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayPowerListItem = ({
  digitalName = null,
  joinNumberOn,
  joinNumberOff,
  serialName = null,
  primaryText = "",
  faIcon = null,
  websocketObject,
  feedbackObject,
  storedElements = [],
}) => {
  const [dynamicText, dynamicTextState] = useState({ value: "Status" });
  const [displayPower, displayPowerState] = useState({ value: false });

  const handleChange = (event) => {
    event.target.checked
      ? sendMessage("digital=" + joinNumberOn + "\x0d\x0a")
      : sendMessage("digital=" + joinNumberOff + "\x0d\x0a");
  };

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    try {
      if (
        feedbackObject.fb.fb_objects[0].type === "bool" &&
        feedbackObject.fb.fb_objects[0].id === digitalName
      ) {
        feedbackObject.fb.fb_objects[0].value === "1"
          ? displayPowerState({ value: true })
          : displayPowerState({ value: false });
      } else if (
        feedbackObject.fb.fb_objects[0].type === "string" &&
        feedbackObject.fb.fb_objects[0].id === serialName
      ) {
        dynamicTextState({ value: feedbackObject.fb.fb_objects[0].value });
      }
    } catch {
      console.warn("Waiting for payload from processor");
    }
    return () => {};
  }, [feedbackObject.fb, digitalName, serialName]);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    var foundIndexDigital = storedElements.findIndex(
      (x) => x.id === digitalName
    );
    if (foundIndexDigital >= 0) {
      if (
        storedElements[foundIndexDigital].type === "bool" &&
        storedElements[foundIndexDigital].id === digitalName
      ) {
        storedElements[foundIndexDigital].value === "1"
          ? displayPowerState({ value: true })
          : displayPowerState({ value: false });
      }
    }
    var foundIndexSerial = storedElements.findIndex((x) => x.id === serialName);
    if (foundIndexSerial >= 0) {
      if (
        storedElements[foundIndexSerial].type === "string" &&
        storedElements[foundIndexSerial].id === serialName
      ) {
        dynamicTextState({ value: storedElements[foundIndexSerial].value });
      }
    }
  }, [storedElements, digitalName, serialName]);

  // Send message to websocket
  const sendMessage = (data) => {
    if (data.search("undefined") === -1) {
      try {
        if (websocketObject.socket.OPEN) websocketObject.socket.send(data);
      } catch (error) {
        console.warn(
          "Component id:" + digitalName + " had a websocketObject problem"
        );
        console.log(error);
      }
    }
  };

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <FontAwesomeIcon icon={faIcon} size="2x" />
        </ListItemIcon>
        <ListItemText primary={primaryText} secondary={dynamicText.value} />
        <Switch
          edge="end"
          checked={displayPower.value}
          onChange={handleChange}
        />
      </ListItem>
    </List>
  );
};

DisplayPowerListItem.propTypes = {
  digitalName: PropTypes.string,
  joinNumberOn: PropTypes.string,
  joinNumberOff: PropTypes.string,
  serialName: PropTypes.string,
  eventType: PropTypes.string,
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default DisplayPowerListItem;
