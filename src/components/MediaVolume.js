import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/pro-duotone-svg-icons";
import { useSelector } from "react-redux";

// Props definition for component /////////////////////////////////////////////
// "serialName" - Dynamic button text. This name should match up to the Crestron serial name paramiter
// "sendMessage" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
///////////////////////////////////////////////////////////////////////////////

const MediaVolume = ({ serialName = null, sendMessage }) => {
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
  const feedbackStore = useSelector((state) => state.feedback.value);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    if (!moving) {
      var foundIndexSerial = feedbackStore.findIndex(
        (x) => x.id === serialName
      );
      if (foundIndexSerial >= 0) {
        if (
          feedbackStore[foundIndexSerial].type === "string" &&
          feedbackStore[foundIndexSerial].id === serialName
        ) {
          setbarValue(feedbackStore[foundIndexSerial].value);
        }
      }
    }
    return () => {};
  }, [feedbackStore, moving, serialName]);

  return (
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
  );
};

MediaVolume.propTypes = {
  serialName: PropTypes.string,
  sendMessage: PropTypes.func,
};

export default MediaVolume;
