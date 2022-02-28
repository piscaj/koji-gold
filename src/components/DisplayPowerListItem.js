import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const DisplayPowerListItem = ({
  digitalName = null,
  joinNumberOn,
  joinNumberOff,
  serialName = null,
  primaryText = "",
  faIcon = null,
  sendMessage,
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
          ? displayPowerState({ value: true })
          : displayPowerState({ value: false });
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
    return () => {};
  }, [feedbackStore, digitalName, serialName]);

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
};

export default DisplayPowerListItem;
