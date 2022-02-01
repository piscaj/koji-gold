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
        textAlign: "center",
        p: "10px",
      }}
    >
      <Box>
        <Header title="Inputs" />
      </Box>
      <Box className="switcher-container">
        <SwitcherSoutce
          sourceCount={10}
          digitalOffset={11}
          websocketObject={websocketObject}
          feedbackObject={feedbackObject}
          storedElements={storedElements}
        />
      </Box>

      <Box>
        <Header title="Outputs" />
      </Box>
      <Box className="switcher-container">
        <SwitcherDest
          sourceCount={5}
          digitalOffset={21}
          websocketObject={websocketObject}
          feedbackObject={feedbackObject}
          storedElements={storedElements}
        />
      </Box>
    </Paper>
  );
};
VideoSwitching.propTypes = {
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default VideoSwitching;
