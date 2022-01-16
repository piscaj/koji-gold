import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/pro-duotone-svg-icons";

const MediaVolume = () => {
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          value={value}
          onChange={handleChange}
        />
        <FontAwesomeIcon icon={faVolumeUp} size="lg" />
      </Stack>
    </Box>
  );
};

export default MediaVolume;
