import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import RoomPcStatus from "./RoomPcStatus";
import Fade from "@mui/material/Fade";

const RoomPc = ({ sendMessage, feedbackObject, storedElements }) => {
  return (
    <Fade in={true}>
      <Paper
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          m: "10px",
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box sx={{ mt: "20px" }}>
            <Header title="Room PC" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
              mb: "20px",
            }}
          >
            <Box sx={{ padding: "10px" }}>
              <RoomPcStatus
                feedbackObject={feedbackObject}
                storedElements={storedElements}
                syncStatusName="sync-room-pc"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

RoomPc.propTypes = {
  sendMessage: PropTypes.func,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default RoomPc;
