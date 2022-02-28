import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Props definition for component /////////////////////////////////////////////
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "websocketObject" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
///////////////////////////////////////////////////////////////////////////////

const Linker = ({ digitalName, link }) => {
  const navigate = useNavigate();
  const feedbackStore = useSelector((state) => state.feedback.value);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    var foundIndexDigital = feedbackStore.findIndex(
      (x) => x.id === digitalName
    );
    if (foundIndexDigital >= 0) {
      if (
        feedbackStore[foundIndexDigital].type === "bool" &&
        feedbackStore[foundIndexDigital].id === digitalName
      ) {
        if (feedbackStore[foundIndexDigital].value === "1") navigate(link);
      }
    }
    return () => {};
  }, [feedbackStore, digitalName, link, navigate]);

  return <></>;
};
Linker.propTypes = {
  link: PropTypes.string,
  digitalName: PropTypes.string,
};

export default Linker;
