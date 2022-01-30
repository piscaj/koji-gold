import PropTypes from "prop-types";
import DestinationButton from "./DestinationButton";
import Box from "@mui/material/Box";
import "./scss/Switcher.scss";

const SwitcherDest = ({
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
          <DestinationButton
            text={"Dest " + (index + 1)}
            digitalName={"output-" + (index + 1) + "-d"}
            serialName={"output-" + (index + 1) + "-s"}
            inputName={"output-fb-" + (index + 1) + "-s"}
            joinNumber={index + 1 + digitalOffset}
            joinNumberDelete={index + 1 + sourceCount + digitalOffset}
            muiVariant="contained"
            addStyle={{
              maxWidth: "150px",
              maxHeight: "70px",
              minWidth: "150px",
              minHeight: "70px",
              display: "inline-flex", //Set text to top of button
              alignItems: "flex-start", //Set text to top of button
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

SwitcherDest.propTypes = {
  sourceCount: PropTypes.number,
  digitalOffset: PropTypes.number,
  websocketObject: PropTypes.object,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default SwitcherDest;
