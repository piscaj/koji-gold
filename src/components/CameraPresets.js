import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-duotone-svg-icons";

const CameraPresets = ({
  websocketObject,
  feedbackObject,
  storedElements,
  onMouseUp,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        mt: "10px",
        background: "white",
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
            text="Preset 1"
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
            text="Preset 2"
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
          <Button
            variant="text"
            onMouseUp={onMouseUp}
            sx={{
              maxWidth: "75px",
              maxHeight: "75px",
              minWidth: "75px",
              minHeight: "75px",
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
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
            text="Preset 3"
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
            text="Preset 4"
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
            text="Preset 5"
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
            text="Preset 6"
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
            text="Preset 7"
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
            text="Preset 8"
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
      </Box>
    </Box>
  );
};

export default CameraPresets;
