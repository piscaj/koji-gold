import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faBan } from "@fortawesome/pro-duotone-svg-icons";

// Props definition for component /////////////////////////////////////////////
// "websocketObject" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
// "syncStatusName" - This name should match up to the Crestron digital name paramiter
///////////////////////////////////////////////////////////////////////////////

const RoomPcStatus = ({
  feedbackObject,
  storedElements = [],
  syncStatusName = null,
}) => {
  const [sync, syncState] = useState({ value: false });

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    try {
      if (
        feedbackObject.fb_objects[0].type === "bool" &&
        feedbackObject.fb_objects[0].id === syncStatusName
      ) {
        feedbackObject.fb_objects[0].value === "1"
          ? syncState({ value: true })
          : syncState({ value: false });
      }
    } catch {
      console.warn("Waiting for payload from processor");
    }
    return () => {};
  }, [feedbackObject, syncStatusName]);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
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
  }, [storedElements, syncStatusName]);

  useEffect(() => {
    if (!syncStatusName === null) syncState({ value: false });
  }, [syncStatusName]);

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
          {sync.value === true ? (
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
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
  syncStatusName: PropTypes.string,
};

export default RoomPcStatus;
