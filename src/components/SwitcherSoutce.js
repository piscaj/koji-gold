import PropTypes from "prop-types";
import MuiButton from "./MuiButton";
import Box from "@mui/material/Box";
import "./scss/Switcher.scss";

const SwitcherSoutce = ({
  sourceCount = 1,
  digitalOffset = 1,
  websocketObject,
  feedbackObject,
  storedElements,
}) => {
  return (
    <Box className="source">
      {[...Array(sourceCount)].map((value, index) => (
        <Box
          key={index + 1}
          sx={{
            p: "5px",
            position: "relative",
          }}
        >
          <MuiButton
            text={"Source " + (index + 1)}
            digitalName={"input-" + (index + 1) + "-d"}
            serialName={"input-" + (index + 1) + "-s"}
            joinNumber={index + 1 + digitalOffset}
            muiVariant="contained"
            addStyle={{
              maxWidth: "150px",
              maxHeight: "70px",
              minWidth: "150px",
              minHeight: "70px",
            }}
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        </Box>
      ))}
    </Box>
  );
};

SwitcherSoutce.propTypes = {
  sourceCount: PropTypes.number,
  digitalOffset: PropTypes.number,
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default SwitcherSoutce;
