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
              <Link to="/roompc" className="text-link">
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
              <Link to="/laptop" className="text-link">
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
              <Link to="/buttonshowcase" className="text-link">
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
            <Divider />
          </Box>
        </SwipeableDrawer>
      </Box>
    </>
  );
});

export default MenuLeft;
