import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./widgets/Header";
import SwitcherSoutce from "./widgets/SwitcherSoutce";
import SwitcherDest from "./widgets/SwitcherDest";
import "./assets/scss/Switcher.scss";
import Fade from "@mui/material/Fade";

const VideoSwitching = ({ props }) => {
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
        <SwitcherSoutce sourceCount={10} digitalOffset={11} />

        <Box
          sx={{
            mt: "10px",
          }}
        >
          <Header title="Outputs" />
        </Box>

        <SwitcherDest sourceCount={5} digitalOffset={21} />
      </Paper>
    </Fade>
  );
};

export default VideoSwitching;
