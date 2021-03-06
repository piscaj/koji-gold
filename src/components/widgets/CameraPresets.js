import Box from "@mui/material/Box";
import MuiButton from "./MuiButton";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-duotone-svg-icons";
import Paper from "@mui/material/Paper";

const CameraPresets = ({ onMouseUp }) => {
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-1"
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-2"
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
                width: "75px",
                height: "75px",
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-3"
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-4"
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-5"
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-6"
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-7"
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
                width: "75px",
                height: "75px",
              }}
              eventType={"press"}
              digitalName="camera-preset-8"
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CameraPresets;
