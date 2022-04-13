import PropTypes from "prop-types";
import MuiButton from "./MuiButton";
import Box from "@mui/material/Box";
import "../assets/scss/Switcher.scss";

const SwitcherSoutce = ({ sourceCount = 1, digitalOffset = 1 }) => {
  return (
    <Box className="source-scroll">
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
            muiVariant="contained"
            addStyle={{
              width: "150px",
              height: "70px",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

SwitcherSoutce.propTypes = {
  sourceCount: PropTypes.number,
  digitalOffset: PropTypes.number,
};

export default SwitcherSoutce;
