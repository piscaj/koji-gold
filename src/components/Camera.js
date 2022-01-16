import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import MuiButton from "./MuiButton";

const Camera = ({ websocketObject, feedbackObject, storedElements }) => {
  return (
    <>
      <Paper>
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
            <Box sx={{ padding: "20px" }}>
              <MuiButton
                text="CAMERA"
                muiColor="primary"
                addStyle={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  minWidth: "100px",
                  minHeight: "100px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="matrix_source1"
                joinNumber={101}
                serialName=""
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Camera;
