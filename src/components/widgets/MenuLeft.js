import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faWebcam,
  faDesktop,
  faTheaterMasks,
  faExchangeAlt,
  faProjector,
  faTv,
} from "@fortawesome/pro-duotone-svg-icons";
import "../assets/scss/MenuL.scss";
import DisplayPowerListItem from "./DisplayPowerListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiButton from "./MuiButton";
import { useSelector } from "react-redux";

const MenuLeft = forwardRef((props, ref) => {
  const [drawerOpen, drawerOpenState] = useState({ value: false });
  const feedbackStore = useSelector((state) => state.feedback.value);

  //iOS is hosted on high-end devices. The backdrop transition can be enabled without dropping frames. The performance will be good enough.
  //iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [menuIndex, menuIndexState] = useState({ value: "" });

  const setDrawerOpen = (newState) => {
    drawerOpenState({ value: newState });
  };

  useImperativeHandle(ref, () => ({
    toggleDrawer() {
      drawerOpenState({ value: drawerOpen.value === false ? true : false });
    },
  }));

  useEffect(() => {
    let mounted = true;
    var foundIndexSerial = feedbackStore.findIndex(
      (x) => x.id === props.serialName
    );
    if (foundIndexSerial >= 0) {
      if (
        feedbackStore[foundIndexSerial].type === "string" &&
        feedbackStore[foundIndexSerial].id === props.serialName &&
        mounted
      ) {
        menuIndexState({ value: feedbackStore[foundIndexSerial].value });
      }
    }
    return () => {
      mounted = false;
    };
  }, [feedbackStore, props.serialName]);

  return (
    <>
      <Box>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen.value}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <Box sx={{ width: "270px" }}>
            <List>
              <ListItem
                button
                selected={menuIndex.value === "index-1" ? true : false}
                onClick={() => {
                  props.sendMessage("digital=1\x0d\x0a");
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faDesktop} size="2x" />
                </ListItemIcon>

                <ListItemText
                  primary="Room PC"
                  secondary="for ZOOM conference"
                />
              </ListItem>
            </List>
            <List>
              <ListItem
                selected={menuIndex.value === "index-2" ? true : false}
                button
                onClick={() => {
                  props.sendMessage("digital=2\x0d\x0a");
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faLaptop} size="2x" />
                </ListItemIcon>

                <ListItemText primary="Laptop" secondary="& portable devices" />
              </ListItem>
            </List>
            <List>
              <ListItem
                selected={menuIndex.value === "index-3" ? true : false}
                button
                onClick={() => {
                  props.sendMessage("digital=3\x0d\x0a");
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faWebcam} size="2x" />
                </ListItemIcon>

                <ListItemText primary="Camera Controls" secondary="& presets" />
              </ListItem>
            </List>
            <List>
              <ListItem
                selected={menuIndex.value === "index-5" ? true : false}
                button
                onClick={() => {
                  props.sendMessage("digital=5\x0d\x0a");
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faExchangeAlt} size="2x" />
                </ListItemIcon>

                <ListItemText
                  primary="Video Switching"
                  secondary="Advanced source routing"
                />
              </ListItem>
            </List>
            <List>
              <ListItem
                button
                selected={menuIndex.value === "index-4" ? true : false}
                onClick={() => {
                  props.sendMessage("digital=4\x0d\x0a");
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faTheaterMasks} size="2x" />
                </ListItemIcon>

                <ListItemText primary="Showcase" secondary="MUI Components" />
              </ListItem>
            </List>
            <Divider />
            <DisplayPowerListItem
              primaryText="Projector Power"
              faIcon={faProjector}
              digitalName="projector-power"
              serialName="projector-status"
              joinNumberOn="32"
              joinNumberOff="33"
              sendMessage={props.sendMessage}
            />

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Screen
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      p: "2px",
                    }}
                  >
                    <MuiButton
                      text="Up"
                      muiColor="primary"
                      muiColorFeedback="secondary"
                      muiVariant="contained"
                      addStyle={{
                        maxWidth: "80px",
                        maxHeight: "30px",
                        minWidth: "80px",
                        minHeight: "30px",
                      }}
                      digitalName="screen-up"
                      joinNumber={36}
                      serialName=""
                      sendMessage={props.sendMessage}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "inline-block",
                      p: "2px",
                    }}
                  >
                    <MuiButton
                      text="Down"
                      muiColor="primary"
                      muiColorFeedback="secondary"
                      muiVariant="contained"
                      addStyle={{
                        maxWidth: "80px",
                        maxHeight: "30px",
                        minWidth: "80px",
                        minHeight: "30px",
                      }}
                      digitalName="screen-down"
                      joinNumber={37}
                      serialName=""
                      sendMessage={props.sendMessage}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <DisplayPowerListItem
              primaryText="Monitor Power"
              faIcon={faTv}
              digitalName="monitor-power"
              serialName="monitor-status"
              joinNumberOn="34"
              joinNumberOff="35"
              sendMessage={props.sendMessage}
            />
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
});

export default MenuLeft;