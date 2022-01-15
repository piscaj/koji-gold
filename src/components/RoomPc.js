import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import LaptopButton from "./LaptopButton";

const RoomPc = ({ websocketObject, feedbackObject, storedElements }) => {
  return (
    <>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
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
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              mb: "20px",
            }}
          >
            <Box sx={{ padding: "20px" }}>
              <LaptopButton
                text="ROOM PC"
                muiColor="primary"
                addStyle={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  minWidth: "150px",
                  minHeight: "150px",
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

export default RoomPc;
