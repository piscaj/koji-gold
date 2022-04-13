import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/pro-duotone-svg-icons";
import { useStringState, usePublishString } from "../imports/EventBus";

// Props definition for component /////////////////////////////////////////////
// "serialName" - Dynamic button text. This name should match up to the Crestron serial name paramiter
// "sendMessage" - Pass the websocket as an object here
///////////////////////////////////////////////////////////////////////////////

const MediaVolume = ({ serialName = null }) => {
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
    //The slider moving "event" likes to trigger on the same value more than once,
    //so lets clean this up and make sure we are not sending
    // duplicate values down the websocket to the processor.
    if (barValue + 1 !== value) publishString();
    setbarValue(value);
  };

  //Hook for digital and string events
  const stringState = useStringState(serialName);
  const publishString = usePublishString(serialName, barValue);

  //Watch for serial events
  useEffect(() => {
    if (!moving) {
      if (stringState !== undefined) setbarValue(stringState);
    }
    return () => {};
  }, [stringState, moving]);

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
};

export default MediaVolume;
