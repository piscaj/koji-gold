import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import SwitcherSoutce from "./SwitcherSoutce";
import SwitcherDest from "./SwitcherDest";
import "./scss/Switcher.scss";

const VideoSwitching = ({
  websocketObject,
  feedbackObject,
  storedElements,
}) => {
  return (
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
        websocketObject={websocketObject}
        feedbackObject={feedbackObject}
        storedElements={storedElements}
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
        websocketObject={websocketObject}
        feedbackObject={feedbackObject}
        storedElements={storedElements}
      />
    </Paper>
  );
};
VideoSwitching.propTypes = {
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default VideoSwitching;
