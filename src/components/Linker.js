import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Props definition for component /////////////////////////////////////////////
// "digitalName" - This name should match up to the Crestron digital name paramiter
// "websocketObject" - Pass the websocket as an object here
// "feedbackObject" - Pass the data from the websocket here
// "storedElements" - Array of fb_objects current values
///////////////////////////////////////////////////////////////////////////////

const Linker = ({ digitalName, link, feedbackObject, storedElements = [] }) => {
  const navigate = useNavigate();

  // This is where the realtime update happens from the wsObject.fb
  useEffect(() => {
    if (Object.keys(feedbackObject).length === 0) {
    }else{
      try {
        if (
          feedbackObject.fb_objects[0].type === "bool" &&
          feedbackObject.fb_objects[0].id === digitalName
        ) {
          if (feedbackObject.fb_objects[0].value === "1") navigate(link);
        }
      } catch {
        console.warn("Waiting for payload from processor");
      }
    }
    return () => {};
  }, [feedbackObject, digitalName, link, navigate]);

  // When the component mounts set its last state if there was one.
  // This is our store for all the fb_objects elements that hold the sockets last incoming value.
  useEffect(() => {
    var foundIndexDigital = storedElements.findIndex(
      (x) => x.id === digitalName
    );
    if (foundIndexDigital >= 0) {
      if (
        storedElements[foundIndexDigital].type === "bool" &&
        storedElements[foundIndexDigital].id === digitalName
      ) {
        if (storedElements[foundIndexDigital].value === "1") navigate(link);
      }
    }
  }, [storedElements, digitalName, link, navigate]);

  return <></>;
};
Linker.propTypes = {
  link: PropTypes.string,
  digitalName: PropTypes.string,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default Linker;
