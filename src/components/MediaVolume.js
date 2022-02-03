import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/pro-duotone-svg-icons";

// Props definition for component /////////////////////////////////////////////
// "serialName" - Dynamic button text. This name should match up to the Crestron serial name paramiter
// "websocketObject" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
///////////////////////////////////////////////////////////////////////////////

const MediaVolume = ({
  serialName = null,
  websocketObject,
  feedbackObject,
  storedElements = [],
}) => {
  const [barValue, setbarValue] = useState("25");
  const [moving, setMoving] = useState(false);
  var movingTimeout;
  const handleCommitted = (event, value) => {
    movingTimeout = setTimeout(() => {
      setMoving(false);
    }, 2000);
  };
  const handleChange = (event, value) => {
    //Clear the last timeout for the websocket stream activation
    clearTimeout(movingTimeout);
    //Reset... We are moving the slider, so stop websocket feedback stream
    setMoving(true);
    // the slider moving "event" likes to trigger on the same value more than once,
    //so lets clean this up and make sure we are not sending
    // duplicate values down the websocket to the processor.
    if (value !== barValue) {
      sendMessage(serialName + "=" + value + "\x0d\x0a");
    }
    //update the slider value for the badge that appears over the slider.
    setbarValue(value);
  };

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    if (!moving) {
      try {
        if (
          feedbackObject.fb.fb_objects[0].type === "string" &&
          feedbackObject.fb.fb_objects[0].id === serialName
        ) {
          setbarValue(feedbackObject.fb.fb_objects[0].value);
        }
      } catch {
        console.warn("Waiting for payload from processor");
      }
    }
    return () => {};
  }, [feedbackObject.fb, serialName, moving]);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    var foundIndexSerial = storedElements.findIndex((x) => x.id === serialName);

    if (foundIndexSerial >= 0) {
      if (
        storedElements[foundIndexSerial].type === "string" &&
        storedElements[foundIndexSerial].id === serialName
      ) {
        setbarValue(storedElements[foundIndexSerial].value);
      }
    }
  }, [storedElements, serialName]);

  // Send message to websocket
  const sendMessage = (data) => {
    if (data.search("undefined") === -1) {
      try {
        if (websocketObject.socket.OPEN) websocketObject.socket.send(data);
      } catch (error) {
        console.warn(
          "Component id:" + serialName + " had a websocketObject problem"
        );
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: 300,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 1 }} alignItems="center">
        <FontAwesomeIcon icon={faVolumeDown} size="lg" />
        <Slider
          valueLabelDisplay="auto"
          value={isNaN(parseInt(barValue, 10)) ? 10 : parseInt(barValue, 10)}
          onChange={handleChange}
          onChangeCommitted={handleCommitted}
        />
        <FontAwesomeIcon icon={faVolumeUp} size="lg" />
      </Stack>
    </Box>
  );
};

MediaVolume.propTypes = {
  serialName: PropTypes.string,
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default MediaVolume;
