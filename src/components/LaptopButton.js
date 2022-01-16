import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faBan } from "@fortawesome/pro-duotone-svg-icons";

// Props definition for component /////////////////////////////////////////////
// "text" - Button text
// "muiColor" - Default "primary" Inactive state of the button. This must be an MUI Button color value
// "muiColorFeedback" - Default "secondary" Active state of the button. This must be an MUI Button color value
// "muiVariant" - Default "outlined" - This must be an MUI Variant value
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "joinNumber" - Digital join number in Crestron for pulse/push
// "serialName" - Dynamic button text. This name should match up to the Crestron serial name paramiter
// "eventType" - Default "click" - values: "click" or "press"
// "websocketObject" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
// "syncStatusName" - This name should match up to the Crestron digital name paramiter
///////////////////////////////////////////////////////////////////////////////

const LaptopButton = ({
  text,
  muiColor = null,
  muiColorFeedback = null,
  muiVariant = null,
  addStyle = {},
  digitalName,
  joinNumber,
  serialName = null,
  eventType = null,
  websocketObject,
  feedbackObject,
  storedElements = [],
  syncStatusName = null,
}) => {
  const [style, styleState] = useState({ value: "primary" });
  const [handlerType, handlerTypeState] = useState({
    value: eventType === null ? "click" : eventType,
  });
  const [variantType, variantTypeState] = useState({
    value: muiVariant === null ? "outlined" : muiVariant,
  });
  const [styleType, styleTypeState] = useState({
    value: addStyle === {} ? {} : addStyle,
  });
  const [dynamicText, dynamicTextState] = useState({ value: "" });
  const [inActiveColor, inActiveColorState] = useState({
    value: muiColor === null ? "primary" : muiColor,
  });
  const [activeColor, activeColorState] = useState({
    value: muiColorFeedback === null ? "secondary" : muiColorFeedback,
  });
  const [sync, syncState] = useState({ value: false });

  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      //add additional styling here if needed
    },
  });
  const classes = useStyles();

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    try {
      if (
        feedbackObject.fb.fb_objects[0].type === "bool" &&
        feedbackObject.fb.fb_objects[0].id === digitalName
      ) {
        feedbackObject.fb.fb_objects[0].value === "1"
          ? styleState({ value: activeColor.value })
          : styleState({ value: inActiveColor.value });
      } else if (
        feedbackObject.fb.fb_objects[0].type === "string" &&
        feedbackObject.fb.fb_objects[0].id === serialName
      ) {
        dynamicTextState({ value: feedbackObject.fb.fb_objects[0].value });
      } else if (
        feedbackObject.fb.fb_objects[0].type === "bool" &&
        feedbackObject.fb.fb_objects[0].id === syncStatusName
      ) {
        feedbackObject.fb.fb_objects[0].value === "1"
          ? syncState({ value: true })
          : syncState({ value: false });
      }
    } catch {
      console.warn("Waiting for payload from processor");
    }
    return () => {};
  }, [
    feedbackObject.fb,
    digitalName,
    activeColor,
    inActiveColor,
    serialName,
    syncStatusName,
  ]);

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
          ? styleState({ value: activeColor.value })
          : styleState({ value: inActiveColor.value });
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
    var foundIndexSync = storedElements.findIndex(
      (x) => x.id === syncStatusName
    );
    if (foundIndexSync >= 0) {
      if (
        storedElements[foundIndexSync].type === "bool" &&
        storedElements[foundIndexSync].id === syncStatusName
      ) {
        storedElements[foundIndexSync].value === "1"
          ? syncState({ value: true })
          : syncState({ value: false });
      }
    }
  }, [
    storedElements,
    digitalName,
    serialName,
    activeColor,
    inActiveColor,
    syncStatusName,
  ]);

  useEffect(() => {
    if (!serialName === null) dynamicTextState({ value: serialName });
  }, [serialName]);

  useEffect(() => {
    if (!eventType === null) {
      handlerTypeState({ value: eventType });
    }
  }, [eventType]);

  useEffect(() => {
    if (!muiVariant === null) {
      variantTypeState({ value: muiVariant });
    }
  }, [muiVariant]);

  useEffect(() => {
    if (!addStyle === {}) {
      styleTypeState({ value: addStyle });
    }
  }, [addStyle]);

  useEffect(() => {
    if (!muiColor === null) inActiveColorState({ value: muiColor });
    if (!muiColorFeedback === null)
      activeColorState({ value: muiColorFeedback });
  }, [muiColor, muiColorFeedback]);

  useEffect(() => {
    if (!syncStatusName === null) syncState({ value: false });
  }, [syncStatusName]);

  // Send message to websocket
  const sendMessage = (data) => {
    try {
      if (websocketObject.socket.OPEN) websocketObject.socket.send(data);
    } catch (error) {
      console.warn(
        "Component id:" + digitalName + " had a websocketObject problem"
      );
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        id={digitalName}
        variant={variantType.value}
        color={style.value}
        style={styleType.value}
        className={classes.button}
        onClick={
          handlerType.value === "click"
            ? () => {
                sendMessage("digital=" + joinNumber + "\x0d\x0a");
              }
            : undefined
        }
        onMouseDown={
          handlerType.value === "press"
            ? () => {
                sendMessage(digitalName + "=1\x0d\x0a");
              }
            : undefined
        }
        onMouseUp={
          handlerType.value === "press"
            ? () => {
                sendMessage(digitalName + "=0\x0d\x0a");
              }
            : undefined
        }
        onTouchStart={
          handlerType.value === "press"
            ? () => {
                sendMessage(digitalName + "=1\x0d\x0a");
              }
            : undefined
        }
        onTouchEnd={
          handlerType.value === "press"
            ? () => {
                sendMessage(digitalName + "=0\x0d\x0a");
              }
            : undefined
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: "2.5px",
            }}
          >
            {sync.value === true ? (
              <FontAwesomeIcon icon={faLaptop} size="4x" />
            ) : (
              <i className="fa-stack fa-2x">
                <FontAwesomeIcon icon={faLaptop} className="fa-stack-1x" />
                <FontAwesomeIcon
                  icon={faBan}
                  style={{ color: "Tomato" }}
                  className="fa-stack-2x"
                />
              </i>
            )}
          </Box>
          <Box
            sx={{
              p: "2.5px",
            }}
          >
            {dynamicText.value === "" ? text : dynamicText.value}
          </Box>
          {sync.value === false ? (
            <Box
              sx={{
                fontSize: "10px",
              }}
            >
              ( Device undetected )
            </Box>
          ) : undefined}
        </Box>
      </Button>
    </div>
  );
};

LaptopButton.propTypes = {
  text: PropTypes.string,
  muiColor: PropTypes.string,
  muiColorFeedback: PropTypes.string,
  muiVariant: PropTypes.string,
  addStyle: PropTypes.object,
  digitalName: PropTypes.string,
  serialName: PropTypes.string,
  eventType: PropTypes.string,
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
  syncStatusName: PropTypes.string,
};

export default LaptopButton;
