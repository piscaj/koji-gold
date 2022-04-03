import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faBan } from "@fortawesome/pro-duotone-svg-icons";
import { useDigitalState } from "../imports/EventBus";

// Props definition for component /////////////////////////////////////////////
// "syncStatusName" - This name should match up to the Crestron digital name paramiter
///////////////////////////////////////////////////////////////////////////////

const RoomPcStatus = ({ syncStatusName }) => {
  const [sync, syncState] = useState(false);

  //Hook for digital and string events
  const digitalState = useDigitalState(syncStatusName);

  //Watch for digital events
  useEffect(() => {
    if (digitalState !== undefined)
      digitalState === "1" ? syncState(true) : syncState(false);
    return () => {};
  }, [digitalState]);

  return (
    <div>
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
            <FontAwesomeIcon icon={faDesktop} size="7x" />
          ) : (
            <i className="fa-stack fa-5x">
              <FontAwesomeIcon icon={faDesktop} className="fa-stack-1x" />
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
        ></Box>
        {sync.value === false ? (
          <>
            <Box
              sx={{
                fontSize: "18px",
              }}
            >
              Device undetected
            </Box>
            <Box
              sx={{
                fontSize: "10px",
              }}
            >
              The Room PC could be in standby or powered off
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                fontSize: "18px",
              }}
            >
              Presentation and ZOOM
            </Box>
            <Box
              sx={{
                fontSize: "10px",
              }}
            >
              Wireless mouse and keyboard at table
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

RoomPcStatus.propTypes = {
  syncStatusName: PropTypes.string,
};

export default RoomPcStatus;
