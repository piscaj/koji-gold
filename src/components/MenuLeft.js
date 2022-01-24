import { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
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
} from "@fortawesome/pro-duotone-svg-icons";
import "./scss/MenuL.scss";

const MenuLeft = forwardRef((props, ref) => {
  const [drawerOpen, drawerOpenState] = useState({ value: false });
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const setDrawerOpen = (newState) => {
    drawerOpenState({ value: newState });
  };

  useImperativeHandle(ref, () => ({
    toggleDrawer() {
      drawerOpenState({ value: drawerOpen.value === false ? true : false });
    },
  }));

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
      <Box onClick={() => setDrawerOpen(false)}>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen.value}
          disableDiscovery={iOS}
          disableBackdropTransition={!iOS}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <Box sx={{ width: "250px" }} onClick={() => setDrawerOpen(false)}>
            <List>
              <Link
                to="/roompc"
                className="text-link"
                onClick={() => {
                  sendMessage("digital=1\x0d\x0a");
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faDesktop} size="2x" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Room PC"
                    secondary="for ZOOM conference"
                  />
                </ListItem>
              </Link>
            </List>
            <List>
              <Link
                to="/laptop"
                className="text-link"
                onClick={() => {
                  sendMessage("digital=2\x0d\x0a");
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faLaptop} size="2x" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Laptop"
                    secondary="& portable deveices"
                  />
                </ListItem>
              </Link>
            </List>
            <List>
              <Link
                to="/camera"
                className="text-link"
                onClick={() => {
                  sendMessage("digital=3\x0d\x0a");
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faWebcam} size="2x" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Camera Controls"
                    secondary="& presets"
                  />
                </ListItem>
              </Link>
            </List>
            <List>
              <Link
                to="/showcase"
                className="text-link"
                onClick={() => {
                  sendMessage("digital=4\x0d\x0a");
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faTheaterMasks} size="2x" />
                  </ListItemIcon>

                  <ListItemText primary="Showcase" secondary="MUI Components" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
});

export default MenuLeft;
