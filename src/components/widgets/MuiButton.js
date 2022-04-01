import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDigitalState, useStringState } from "../imports/EventBus";

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
// "faIcon" - FontAwesome icon -- any imported icon
// "faClass" - FontAwesome class -- any fa class
// "faSize" - FontAwesome icon size -- lg, sm, 1x, 2x, 3x, 4x
///////////////////////////////////////////////////////////////////////////////

const MuiButton = ({
  text,
  muiColor = "primary",
  muiColorFeedback = "secondary",
  muiVariant = "contained",
  addStyle = {},
  faIcon,
  faClass,
  faSize,
  digitalName,
  joinNumber = "0",
  serialName,
  eventType = "click",
  sendMessage,
}) => {
  const [style, styleState] = useState("primary");
  const [dynamicText, dynamicTextState] = useState("");
  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      lineHeight: "15px",
      //add additional styling here if needed
    },
  });
  const classes = useStyles();

  const digitalState = useDigitalState(digitalName);
  const stringState = useStringState(serialName);

  useEffect(() => {
    if (digitalState !== undefined)
      digitalState === "1"
        ? styleState(muiColorFeedback)
        : styleState(muiColor);
    return () => {};
  }, [muiColor, muiColorFeedback, digitalState, digitalName]);

  useEffect(() => {
    if (stringState !== undefined) dynamicTextState(stringState);
    return () => {};
  }, [dynamicTextState, stringState, serialName]);

  return (
    <div>
      {eventType === "click" ? (
        <Button
          id={digitalName}
          variant={muiVariant}
          color={style}
          style={addStyle}
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
            {text === "" && dynamicText === "" ? undefined : (
              <Box
                sx={{
                  p: "2.5px",
                }}
              >
                {dynamicText === "" ? text : dynamicText}
              </Box>
            )}
          </Box>
        </Button>
      ) : undefined}
      {eventType === "press" ? (
        <Button
          id={digitalName}
          variant={muiVariant}
          color={style}
          style={addStyle}
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
            {text === "" && dynamicText === "" ? undefined : (
              <Box
                sx={{
                  p: "2.5px",
                }}
              >
                {dynamicText === "" ? text : dynamicText}
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
