import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MuiButton from "./MuiButton";
import PropTypes from "prop-types";
import Header from "./Header";

const ButtonShowcase = ({
  websocketObject,
  feedbackObject,
  storedElements,
}) => {
  return (
    <div>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
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
                joinNumber={8}
                serialName=""
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
              />
            </Box>
            <Box sx={{ p: "5px" }}>
              <MuiButton
                text="Outlined"
                muiColor="success"
                muiColorFeedback="error"
                muiVariant="outlined"
                digitalName="showcase-outlined"
                joinNumber={9}
                serialName=""
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
              />
            </Box>
            <Box sx={{ p: "5px" }}>
              <MuiButton
                text="Some Text"
                muiVariant="text"
                addStyle={{
                  maxWidth: "130px",
                  maxHeight: "25px",
                  minWidth: "130px",
                  minHeight: "25px",
                }}
                muiColor="primary"
                muiColorFeedback="error"
                digitalName="showcase-text"
                joinNumber={10}
                serialName="dynamic-text"
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
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
                websocketObject={websocketObject}
                feedbackObject={feedbackObject}
                storedElements={storedElements}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
MuiButton.propTypes = {
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
};

export default ButtonShowcase;
