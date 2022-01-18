import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";
import { faSearchPlus,faSearchMinus,faHome,faLongArrowUp,faLongArrowDown,faLongArrowLeft,faLongArrowRight } from "@fortawesome/pro-duotone-svg-icons";

const CameraControls = ({
  websocketObject,
  feedbackObject,
  storedElements,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        mt:"10px"
      }}
    >
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
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faSize='4x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            text="Presets"
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faIcon={faLongArrowLeft}
            faSize='4x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faSize='3x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faSize='4x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faSize='2x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faSize='4x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
            faSize='2x'
            muiVariant="text"
            addStyle={{maxWidth: '75px', maxHeight: '75px', minWidth: '75px', minHeight: '75px'}}
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
