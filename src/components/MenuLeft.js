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
import "./scss/MenuL.scss";
import DisplayPowerListItem from "./DisplayPowerListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiButton from "./MuiButton";

const MenuLeft = forwardRef((props, ref) => {
  const [drawerOpen, drawerOpenState] = useState({ value: false });

  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [menuIndex, menuIndexState] = useState({ value: "" });

  const setDrawerOpen = (newState) => {
    drawerOpenState({ value: newState });
  };

  useImperativeHandle(ref, () => ({
    toggleDrawer() {
      drawerOpenState({ value: drawerOpen.value === false ? true : false });
    },
  }));

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    try {
      if (
        props.feedbackObject.fb.fb_objects[0].type === "string" &&
        props.feedbackObject.fb.fb_objects[0].id === props.serialName
      ) {
        menuIndexState({ value: props.feedbackObject.fb.fb_objects[0].value });
      }
    } catch {
      console.warn("Waiting for payload from processor");
    }
    return () => {};
  }, [props.feedbackObject.fb, props.serialName]);

  useEffect(() => {
    var foundIndexSerial = props.storedElements.findIndex(
      (x) => x.id === props.serialName
    );
    if (foundIndexSerial >= 0) {
      if (
        props.storedElements[foundIndexSerial].type === "string" &&
        props.storedElements[foundIndexSerial].id === props.serialName
      ) {
        menuIndexState({ value: props.storedElements[foundIndexSerial].value });
      }
    }
  }, [props.storedElements, props.serialName]);

  // Send message to websocket
  const sendMessage = (data) => {
    try {
      if (props.websocketObject.socket.OPEN)
        props.websocketObject.socket.send(data);
    } catch (error) {
      console.warn("Component MenuL had a websocketObject problem");
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen.value}
          disableDiscovery={iOS}
          disableBackdropTransition={!iOS}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <Box sx={{ width: "270px" }}>
            <List>
              <ListItem
                button
                selected={menuIndex.value === "index-1" ? true : false}
                onClick={() => {
                  sendMessage("digital=1\x0d\x0a");
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
                  sendMessage("digital=2\x0d\x0a");
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
                  sendMessage("digital=3\x0d\x0a");
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
                  sendMessage("digital=5\x0d\x0a");
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
                  sendMessage("digital=4\x0d\x0a");
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
              websocketObject={props.websocketObject}
              feedbackObject={props.feedbackObject}
              storedElements={props.storedElements}
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
                      websocketObject={props.websocketObject}
                      feedbackObject={props.feedbackObject}
                      storedElements={props.storedElements}
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
                      websocketObject={props.websocketObject}
                      feedbackObject={props.feedbackObject}
                      storedElements={props.storedElements}
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
              websocketObject={props.websocketObject}
              feedbackObject={props.feedbackObject}
              storedElements={props.storedElements}
            />
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
});

export default MenuLeft;
