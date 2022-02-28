import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

// Props definition for component /////////////////////////////////////////////
// "text" - Button text
// "muiColor" - Default "primary" Inactive state of the button. This must be an MUI Button color value
// "muiColorFeedback" - Default "secondary" Active state of the button. This must be an MUI Button color value
// "muiVariant" - Default "outlined" - This must be an MUI Variant value
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "joinNumber" - Digital join number in Crestron for pulse/push
// "serialName" - Dynamic button text. This name should match up to the Crestron serial name paramiter
// "eventType" - Default "click" - values: "click" or "press"
// "sendMessage" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
// "faIcon" - FontAwesome icon -- any imported icon
// "faClass" - FontAwesome class -- any fa class
// "faSize" - FontAwesome icon size -- lg, sm, 1x, 2x, 3x, 4x
///////////////////////////////////////////////////////////////////////////////

const MuiButton = ({
  text,
  muiColor = null,
  muiColorFeedback = null,
  muiVariant = null,
  addStyle = {},
  faIcon,
  faClass,
  faSize,
  digitalName = null,
  joinNumber,
  serialName = null,
  eventType = null,
  sendMessage,
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

  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      lineHeight: "15px",
      //add additional styling here if needed
    },
  });
  const classes = useStyles();

  const feedbackStore = useSelector((state) => state.feedback.value);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    var foundIndexDigital = feedbackStore.findIndex(
      (x) => x.id === digitalName
    );
    if (foundIndexDigital >= 0) {
      if (
        feedbackStore[foundIndexDigital].type === "bool" &&
        feedbackStore[foundIndexDigital].id === digitalName
      ) {
        feedbackStore[foundIndexDigital].value === "1"
          ? styleState({ value: activeColor.value })
          : styleState({ value: inActiveColor.value });
      }
    }
    var foundIndexSerial = feedbackStore.findIndex((x) => x.id === serialName);
    if (foundIndexSerial >= 0) {
      if (
        feedbackStore[foundIndexSerial].type === "string" &&
        feedbackStore[foundIndexSerial].id === serialName
      ) {
        dynamicTextState({ value: feedbackStore[foundIndexSerial].value });
      }
    }
    return () => {};
  }, [feedbackStore, digitalName, serialName, activeColor, inActiveColor]);

  useEffect(() => {
    if (!eventType === null) {
      handlerTypeState({ value: eventType });
    }
  }, [eventType]);

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
  }, [muiColor]);

  useEffect(() => {
    if (!muiColorFeedback === null)
      activeColorState({ value: muiColorFeedback });
  }, [muiColorFeedback]);

  return (
    <div>
      {handlerType.value === "click" ? (
        <Button
          id={digitalName}
          variant={variantType.value}
          color={style.value}
          style={styleType.value}
          className={classes.button}
          onClick={() => {
            sendMessage("digital=" + joinNumber + "\x0d\x0a");
          }}
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
            {faIcon ? (
              <Box
                sx={{
                  p: "2.5px",
                }}
              >
                <FontAwesomeIcon
                  icon={faIcon}
                  size={faSize}
                  className={faClass}
                />
              </Box>
            ) : undefined}
            {text === "" && dynamicText.value === "" ? undefined : (
              <Box
                sx={{
                  p: "2.5px",
                }}
              >
                {dynamicText.value === "" ? text : dynamicText.value}
              </Box>
            )}
          </Box>
        </Button>
      ) : undefined}
      {handlerType.value === "press" ? (
        <Button
          id={digitalName}
          variant={variantType.value}
          color={style.value}
          style={styleType.value}
          className={classes.button}
          onMouseDown={() => {
            sendMessage(digitalName + "=1\x0d\x0a");
          }}
          onMouseUp={() => {
            sendMessage(digitalName + "=0\x0d\x0a");
          }}
          onTouchStart={() => {
            sendMessage(digitalName + "=1\x0d\x0a");
          }}
          onTouchEnd={() => {
            sendMessage(digitalName + "=0\x0d\x0a");
          }}
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
            {faIcon ? (
              <Box
                sx={{
                  p: "2.5px",
                }}
              >
                <FontAwesomeIcon
                  icon={faIcon}
                  size={faSize}
                  className={faClass}
                />
              </Box>
            ) : undefined}
            {text === "" && dynamicText.value === "" ? undefined : (
              <Box
                sx={{
                  p: "2.5px",
                }}
              >
                {dynamicText.value === "" ? text : dynamicText.value}
              </Box>
            )}
          </Box>
        </Button>
      ) : undefined}
    </div>
  );
};

MuiButton.propTypes = {
  text: PropTypes.string,
  muiColor: PropTypes.string,
  muiColorFeedback: PropTypes.string,
  muiVariant: PropTypes.string,
  addStyle: PropTypes.object,
  faIcon: PropTypes.object,
  digitalName: PropTypes.string,
  serialName: PropTypes.string,
  eventType: PropTypes.string,
  sendMessage: PropTypes.func,
};

export default MuiButton;
