import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CameraControls from "./widgets/CameraControls";
import Header from "./widgets/Header";
import Fade from "@mui/material/Fade";

const Camera = ({ props }) => {
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
            <Header title="Camera Controls" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              mb: "20px",
            }}
          >
            <CameraControls />
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default Camera;
