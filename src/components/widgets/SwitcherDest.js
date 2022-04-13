import PropTypes from "prop-types";
import DestinationButton from "./DestinationButton";
import Box from "@mui/material/Box";
import "../assets/scss/Switcher.scss";

const SwitcherDest = ({ sourceCount = 1, digitalOffset = 1 }) => {
  return (
    <Box className="destination-scroll">
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
            joinNumberDelete={"output-" + (index + 1) + "-delete"}
            muiVariant="contained"
            addStyle={{
              width: "150px",
              height: "70px",
              display: "inline-flex", //Set text to top of button
              alignItems: "flex-start", //Set text to top of button
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

SwitcherDest.propTypes = {
  sourceCount: PropTypes.number,
  digitalOffset: PropTypes.number,
};

export default SwitcherDest;
