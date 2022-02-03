import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CameraControls from "./CameraControls";
import Header from "./Header";

const Camera = ({ websocketObject, feedbackObject, storedElements }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        m: "10px",
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
          <CameraControls
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
      </Box>
    </Paper>
  );
};
Camera.propTypes = {
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default Camera;
