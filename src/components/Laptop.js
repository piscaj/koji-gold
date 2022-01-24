import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import LaptopButton from "./LaptopButton";

const Laptop = ({ websocketObject, feedbackObject, storedElements }) => {
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
            <Header title="Laptop" />
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
                text="LAPTOP TABLE"
                muiColor="primary"
                addStyle={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  minWidth: "150px",
                  minHeight: "150px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="laptop-1"
                joinNumber={5}
                serialName=""
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
                syncStatusName="sync-laptop-1"
              />
            </Box>
            <Box sx={{ p: "20px" }}>
              <LaptopButton
                text="LAPTOP FLOOR"
                muiColor="primary"
                addStyle={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  minWidth: "150px",
                  minHeight: "150px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="laptop-2"
                joinNumber={6}
                serialName=""
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
                syncStatusName="sync-laptop-2"
              />
            </Box>
            <Box sx={{ p: "20px" }}>
              <LaptopButton
                text="LAPTOP WALL"
                muiColor="primary"
                addStyle={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  minWidth: "150px",
                  minHeight: "150px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="laptop-3"
                joinNumber={7}
                serialName=""
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
                syncStatusName="sync-laptop-3"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Laptop;
