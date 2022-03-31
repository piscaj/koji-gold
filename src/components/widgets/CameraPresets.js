import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-duotone-svg-icons";
import Paper from "@mui/material/Paper";

const CameraPresets = ({
  sendMessage,

  onMouseUp,
}) => {
  return (
    <Paper elevation={0}>
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
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
              sendMessage={sendMessage}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
CameraPresets.propTypes = {
  sendMessage: PropTypes.func,
};

export default CameraPresets;
