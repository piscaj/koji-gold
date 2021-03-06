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

const CameraControls = ({ props }) => {
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
              width: "75px",
              height: "75px",
            }}
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-up"
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
              width: "75px",
              height: "75px",
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-left"
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-home"
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-right"
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-zoom-minus"
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-down"
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
              width: "75px",
              height: "75px",
            }}
            eventType={"press"}
            digitalName="camera-zoom-plus"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CameraControls;
