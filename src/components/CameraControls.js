import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";
import Button from "@mui/material/Button";
import CameraPresets from "./CameraPresets";
import Slide from "@mui/material/Slide";
import {
  faSearchPlus,
  faSearchMinus,
  faHome,
  faLongArrowUp,
  faLongArrowDown,
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/pro-duotone-svg-icons";

const CameraControls = ({
  websocketObject,
  feedbackObject,
  storedElements,
}) => {
  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      //add additional styling here if needed
    },
  });
  const classes = useStyles();

  const [showPreset, showPresetState] = useState(false);

  const show = () => {
    showPresetState((prevState) => (prevState === false ? true : false));
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        mt: "10px",
      }}
    >
      <Slide direction="up" in={showPreset} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            zIndex: 1,
          }}
        >
          <CameraPresets
            onMouseUp={() => {
              show();
            }}
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
      </Slide>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faLongArrowUp}
            faSize="4x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-up"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
        <Box
          sx={{
            p: "5px",
          }}
        >
          <Button
            variant="text"
            className={classes.button}
            onMouseUp={() => {
              show();
            }}
            sx={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
          >
            Presets
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faLongArrowLeft}
            faSize="4x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-left"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faHome}
            faSize="3x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-home"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faLongArrowRight}
            faSize="4x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-right"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faSearchMinus}
            faSize="2x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-zoom-minus"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faLongArrowDown}
            faSize="4x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-down"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
        <Box
          sx={{
            p: "5px",
          }}
        >
          <MuiButton
            text=""
            faIcon={faSearchPlus}
            faSize="2x"
            muiVariant="text"
            addStyle={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
            eventType={"press"}
            digitalName="camera-zoom-plus"
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CameraControls;
