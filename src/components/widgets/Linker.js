import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDigitalState } from "../imports/EventBus";

// Props definition for component /////////////////////////////////////////////
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "link" - This should be the React Router link
///////////////////////////////////////////////////////////////////////////////

const Linker = ({ digitalName, link }) => {
  const navigate = useNavigate();
  //Hooks for digital and string events
  const digitalState = useDigitalState(digitalName);

  //Watch for digital events
  useEffect(() => {
    if (digitalState !== undefined) if (digitalState === "1") navigate(link);
    return () => {};
  }, [digitalState, link, navigate]);

  return <></>;
};
Linker.propTypes = {
  link: PropTypes.string,
  digitalName: PropTypes.string,
};

export default Linker;
