import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";

const DisplayPowerListItem = ({
  digitalName = null,
  joinNumberOn,
  joinNumberOff,
  serialName = null,
  primaryText = "",
  faIcon = null,
  sendMessage,
  feedbackObject,
  storedElements = [],
}) => {
  //Make switch look and act like a native IOS switch
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const [dynamicText, dynamicTextState] = useState({ value: "Status" });
  const [displayPower, displayPowerState] = useState({ value: false });

  const handleChange = (event) => {
    event.target.checked
      ? sendMessage("digital=" + joinNumberOn + "\x0d\x0a")
      : sendMessage("digital=" + joinNumberOff + "\x0d\x0a");
  };

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    let mounted = true;
    if (Object.keys(feedbackObject).length === 0) {
    } else {
      try {
        if (
          feedbackObject.fb_objects[0].type === "bool" &&
          feedbackObject.fb_objects[0].id === digitalName &&
          mounted
        ) {
          feedbackObject.fb_objects[0].value === "1"
            ? displayPowerState({ value: true })
            : displayPowerState({ value: false });
        } else if (
          feedbackObject.fb_objects[0].type === "string" &&
          feedbackObject.fb_objects[0].id === serialName &&
          mounted
        ) {
          dynamicTextState({ value: feedbackObject.fb_objects[0].value });
        }
      } catch {
        console.warn("Waiting for payload from processor");
      }
    }
    return () => {
      mounted = false;
    };
  }, [feedbackObject, digitalName, serialName]);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    let mounted = true;
    var foundIndexDigital = storedElements.findIndex(
      (x) => x.id === digitalName
    );
    if (foundIndexDigital >= 0) {
      if (
        storedElements[foundIndexDigital].type === "bool" &&
        storedElements[foundIndexDigital].id === digitalName &&
        mounted
      ) {
        storedElements[foundIndexDigital].value === "1"
          ? displayPowerState({ value: true })
          : displayPowerState({ value: false });
      }
    }
    var foundIndexSerial = storedElements.findIndex((x) => x.id === serialName);
    if (foundIndexSerial >= 0) {
      if (
        storedElements[foundIndexSerial].type === "string" &&
        storedElements[foundIndexSerial].id === serialName &&
        mounted
      ) {
        dynamicTextState({ value: storedElements[foundIndexSerial].value });
      }
    }
    return () => {
      mounted = false;
    };
  }, [storedElements, digitalName, serialName]);

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <FontAwesomeIcon icon={faIcon} size="2x" />
        </ListItemIcon>
        <ListItemText primary={primaryText} secondary={dynamicText.value} />
        <IOSSwitch
          edge="end"
          checked={displayPower.value}
          onChange={handleChange}
        />
      </ListItem>
    </List>
  );
};

DisplayPowerListItem.propTypes = {
  digitalName: PropTypes.string,
  joinNumberOn: PropTypes.string,
  joinNumberOff: PropTypes.string,
  serialName: PropTypes.string,
  eventType: PropTypes.string,
  sendMessage: PropTypes.func,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default DisplayPowerListItem;
