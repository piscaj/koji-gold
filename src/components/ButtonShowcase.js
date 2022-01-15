import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MuiButton from "./MuiButton";
import PropTypes from "prop-types";
import Header from "./Header";

const ButtonShowcase = ({websocketObject,feedbackObject , storedElements}) => {
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
            <Box sx={{ p: "5px" }}>
              <Header title={"Button"} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
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
                  digitalName="matrix_source1"
                  joinNumber={101}
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
                  digitalName="matrix_source2"
                  joinNumber={102}
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
                  addStyle={{maxWidth: '130px', maxHeight: '25px', minWidth: '130px', minHeight: '25px'}}
                  muiColor="primary"
                  muiColorFeedback="error"
                  digitalName="matrix_source4"
                  joinNumber={104}
                  serialName="text_test"
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
                  digitalName="camera_up"
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
    )
}
MuiButton.propTypes = {
    websocketObject: PropTypes.object,
    feedbackObject: PropTypes.object,
};

export default ButtonShowcase
