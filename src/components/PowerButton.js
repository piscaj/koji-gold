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

// Props definition for component /////////////////////////////////////////////
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "websocketObject" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
///////////////////////////////////////////////////////////////////////////////

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PowerButton = ({
  digitalName = null,
  websocketObject,
  feedbackObject,
  storedElements = [],
}) => {
  const [showPower, showPowerState] = useState({ value: false });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    try {
      if (
        feedbackObject.fb.fb_objects[0].type === "bool" &&
        feedbackObject.fb.fb_objects[0].id === digitalName
      ) {
        feedbackObject.fb.fb_objects[0].value === "1"
          ? showPowerState({ value: true })
          : showPowerState({ value: false });
      }
    } catch {
      console.warn("Waiting for payload from processor");
    }
    return () => {};
  }, [feedbackObject.fb, digitalName]);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    var foundIndexDigital = storedElements.findIndex(
      (x) => x.id === digitalName
    );
    if (foundIndexDigital >= 0) {
      if (
        storedElements[foundIndexDigital].type === "bool" &&
        storedElements[foundIndexDigital].id === digitalName
      ) {
        storedElements[foundIndexDigital].value === "1"
          ? showPowerState({ value: true })
          : showPowerState({ value: false });
      }
    }
  }, [storedElements, digitalName]);

  // Send message to websocket
  const sendMessage = (data) => {
    if (data.search("undefined") === -1) {
      try {
        if (websocketObject.socket.OPEN) websocketObject.socket.send(data);
      } catch (error) {
        console.warn(
          "Component id:" + digitalName + " had a websocketObject problem"
        );
        console.log(error);
      }
    }
  };

  return (
    <>
      <Slide direction="up" in={showPower.value} mountOnEnter unmountOnExit>
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
            <FontAwesomeIcon icon={faPowerOff} size="lg" />
          </IconButton>
        </Box>
      </Slide>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Shutdown?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Power off audiovisual equipment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()}}>Cancel</Button>
          <Button onClick={()=>{handleClose(); sendMessage("digital=38\x0d\x0a");}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PowerButton.propTypes = {
  digitalName: PropTypes.string,
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default PowerButton;
