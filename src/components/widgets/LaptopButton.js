import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faBan } from "@fortawesome/pro-duotone-svg-icons";
import {
  useDigitalState,
  useStringState,
  usePublishDigital,
  usePublishDigitalLatch,
} from "../imports/EventBus";

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
  muiColor = "primary",
  muiColorFeedback = "secondary",
  muiVariant = "contained",
  addStyle = {},
  digitalName,
  serialName,
  eventType = "click",
  syncStatusName,
  digitalPulseTime,
}) => {
  const [style, styleState] = useState("primary");
  const [dynamicText, dynamicTextState] = useState("");
  const [sync, syncState] = useState(false);

  //Hooks for digital and string events
  const digitalState = useDigitalState(digitalName);
  const syncStatus = useDigitalState(syncStatusName);
  const stringState = useStringState(serialName);
  const handleClick = usePublishDigital(digitalName, digitalPulseTime);
  const handleTouchDown = usePublishDigitalLatch(digitalName, true);
  const handleTouchUp = usePublishDigitalLatch(digitalName, false);

  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      //add additional styling here if needed
    },
  });
  const classes = useStyles();

  //Watch for digital events
  useEffect(() => {
    if (digitalState !== undefined)
      digitalState === "1"
        ? styleState(muiColorFeedback)
        : styleState(muiColor);
    return () => {};
  }, [muiColor, muiColorFeedback, digitalState]);

  useEffect(() => {
    if (syncStatus !== undefined)
      syncStatus === "1" ? syncState(true) : syncState(false);
    return () => {};
  }, [syncStatus, syncState]);

  //Watch for serial events
  useEffect(() => {
    if (stringState !== undefined) dynamicTextState(stringState);
    return () => {};
  }, [dynamicTextState, stringState]);

  return (
    <div>
      {eventType === "click" ? (
        <Button
          id={digitalName}
          variant={muiVariant}
          color={style}
          style={addStyle}
          className={classes.button}
          onClick={handleClick}
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
              {sync === true ? (
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
              {dynamicText === "" ? text : dynamicText}
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
      {eventType === "press" ? (
        <Button
          id={digitalName}
          variant={muiVariant}
          color={style}
          style={addStyle}
          className={classes.button}
          onMouseDown={handleTouchDown}
          onMouseUp={handleTouchUp}
          onTouchStart={handleTouchDown}
          onTouchEnd={handleTouchUp}
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
              {sync === true ? (
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
              {dynamicText === "" ? text : dynamicText}
            </Box>
            {sync === false ? (
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
  syncStatusName: PropTypes.string,
};

export default LaptopButton;
