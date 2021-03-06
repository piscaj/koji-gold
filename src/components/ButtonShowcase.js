import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MuiButton from "./widgets/MuiButton";
import Header from "./widgets/Header";
import Fade from "@mui/material/Fade";

const ButtonShowcase = ({ props }) => {
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
          <Box sx={{ m: "15px" }}>
            <Header title={"Showcase"} />
          </Box>
          <Box sx={{ fontSize: "12px", mb: "5px" }}>MUI Button</Box>

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
            <Box sx={{ p: "5px" }}>
              <MuiButton
                text="Contained"
                muiColor="primary"
                muiColorFeedback="secondary"
                muiVariant="contained"
                digitalName="showcase-contained"
                serialName=""
              />
            </Box>
            <Box sx={{ p: "5px" }}>
              <MuiButton
                text="Outlined"
                muiColor="success"
                muiColorFeedback="error"
                muiVariant="outlined"
                digitalName="showcase-outlined"
                serialName=""
              />
            </Box>
            <Box sx={{ p: "5px" }}>
              <MuiButton
                text="Some Text"
                muiVariant="text"
                addStyle={{
                  width: "130px",
                  height: "25px",
                }}
                muiColor="primary"
                muiColorFeedback="error"
                digitalName="showcase-text"
                serialName="dynamic-text"
              />
            </Box>
            <Box sx={{ p: "5px" }}>
              <MuiButton
                text="Press"
                muiVariant="contained"
                muiColor="success"
                muiColorFeedback="error"
                eventType={"press"}
                digitalName="showcase-press"
                serialName=""
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ButtonShowcase;
