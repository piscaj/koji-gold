import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-duotone-svg-icons";

const CameraPresets = ({
  websocketObject,
  feedbackObject,
  storedElements,
  onMouseUp,
}) => {
  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          mt: "10px",
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
              eventType={"press"}
              digitalName="camera-preset-1"
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
              eventType={"press"}
              digitalName="camera-preset-2"
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
              eventType={"press"}
              digitalName="camera-preset-3"
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
              eventType={"press"}
              digitalName="camera-preset-4"
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
              eventType={"press"}
              digitalName="camera-preset-5"
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
              eventType={"press"}
              digitalName="camera-preset-6"
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
              eventType={"press"}
              digitalName="camera-preset-7"
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
              eventType={"press"}
              digitalName="camera-preset-8"
              websocketObject={websocketObject}
              feedbackObject={feedbackObject}
              storedElements={storedElements}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CameraPresets;
