import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import SwitcherSoutce from "./SwitcherSoutce";
import SwitcherDest from "./SwitcherDest";
import "./scss/Switcher.scss";
import Fade from "@mui/material/Fade";

const VideoSwitching = ({ sendMessage }) => {
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
          p: "10px",
          overflow: "scroll",
          textAlign: "center",
        }}
      >
        <Box>
          <Header title="Inputs" />
        </Box>
        <SwitcherSoutce
          sourceCount={10}
          digitalOffset={11}
          sendMessage={sendMessage}
        />

        <Box
          sx={{
            mt: "10px",
          }}
        >
          <Header title="Outputs" />
        </Box>

        <SwitcherDest
          sourceCount={5}
          digitalOffset={21}
          sendMessage={sendMessage}
        />
      </Paper>
    </Fade>
  );
};
VideoSwitching.propTypes = {
  sendMessage: PropTypes.func,
};

export default VideoSwitching;
