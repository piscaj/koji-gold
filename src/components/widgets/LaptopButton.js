import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faBan } from "@fortawesome/pro-duotone-svg-icons";
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
  sendMessage,
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
  const feedbackStore = useSelector((state) => state.feedback.value);

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
    var foundIndexSync = feedbackStore.findIndex(
      (x) => x.id === syncStatusName
    );
    if (foundIndexSync >= 0) {
      if (
        feedbackStore[foundIndexSync].type === "bool" &&
        feedbackStore[foundIndexSync].id === syncStatusName
      ) {
        feedbackStore[foundIndexSync].value === "1"
          ? syncState({ value: true })
          : syncState({ value: false });
      }
    }
    return () => {};
  }, [
    feedbackStore,
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
      ) : undefined}
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
  sendMessage: PropTypes.func,
  syncStatusName: PropTypes.string,
};

export default LaptopButton;