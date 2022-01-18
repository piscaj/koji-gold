import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";

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
            text="0"
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
            text="UP"
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
            text="0"
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
            text="LEFT"
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
            text="HOME"
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
            text="RIGHT"
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
            text="0"
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
            text="DOWN"
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
            text="0"
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
