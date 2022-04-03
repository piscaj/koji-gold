import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/pro-duotone-svg-icons";
import { Box } from "@mui/material";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "../assets/scss/PowerButton.scss";
import { useDigitalState } from "../imports/EventBus";
import { useSelector } from "react-redux";

// Props definition for component /////////////////////////////////////////////
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "sendMessage" - Pass the websocket as an object here
///////////////////////////////////////////////////////////////////////////////

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PowerButton = ({ digitalName, sendMessage }) => {
  const [showPower, showPowerState] = useState(false);
  const [open, setOpen] = React.useState(false);

  //Hook for digital and string events
  const digitalState = useDigitalState(digitalName);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const themeModeStore = useSelector((state) => state.lightDarkMode.value);

  //Watch for digital events
  useEffect(() => {
    if (digitalState !== undefined)
      digitalState === "1" ? showPowerState(true) : showPowerState(false);
    return () => {};
  }, [digitalState]);

  return (
    <>
      <Slide direction="up" in={showPower} mountOnEnter unmountOnExit>
        <Box>
          <Box sx={{ fontSize: "12px", display: "inline-block" }}>
            Power Off
          </Box>
          <IconButton
            sx={{
              mb: "2px",
            }}
            onClick={() => {
              handleClickOpen();
            }}
          >
            {themeModeStore === "dark" ? (
              <FontAwesomeIcon
                icon={faPowerOff}
                size="lg"
                className="fa-beat-fade powerButDuoColorDark"
              />
            ) : (
              <FontAwesomeIcon
                icon={faPowerOff}
                size="lg"
                className="fa-beat-fade powerButDuoColorLight"
              />
            )}
          </IconButton>
        </Box>
      </Slide>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Shutdown?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Power off audiovisual equipment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              sendMessage("digital=38\x0d\x0a");
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PowerButton.propTypes = {
  digitalName: PropTypes.string,
  sendMessage: PropTypes.func,
};

export default PowerButton;
