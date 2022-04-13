import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./widgets/Header";
import LaptopButton from "./widgets/LaptopButton";
import Fade from "@mui/material/Fade";

const Laptop = ({ props }) => {
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
                  width: "150px",
                  height: "150px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="laptop-1"
                serialName=""
                syncStatusName="sync-laptop-1"
              />
            </Box>
            <Box sx={{ p: "20px" }}>
              <LaptopButton
                text="LAPTOP FLOOR"
                muiColor="primary"
                addStyle={{
                  width: "150px",
                  height: "150px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="laptop-2"
                serialName=""
                syncStatusName="sync-laptop-2"
              />
            </Box>
            <Box sx={{ p: "20px" }}>
              <LaptopButton
                text="LAPTOP WALL"
                muiColor="primary"
                addStyle={{
                  width: "150px",
                  height: "150px",
                }}
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="laptop-3"
                serialName=""
                syncStatusName="sync-laptop-3"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default Laptop;
