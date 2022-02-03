import PropTypes from "prop-types";
import Linker from "./Linker";

//This component just moves the clutter of the Linker component out of the Main component to clean things up.

const DrivePages = ({ feedbackObject, storedElements }) => {
  return (
    <>
      <Linker
        link="/roomPc"
        digitalName="menu-1"
        feedbackObject={feedbackObject}
        storedElements={storedElements}
      />
      <Linker
        link="/laptop"
        digitalName="menu-2"
        feedbackObject={feedbackObject}
        storedElements={storedElements}
      />
      <Linker
        link="/camera"
        digitalName="menu-3"
        feedbackObject={feedbackObject}
        storedElements={storedElements}
      />
      <Linker
        link="/showcase"
        digitalName="menu-4"
        feedbackObject={feedbackObject}
        storedElements={storedElements}
      />
      <Linker
        link="/switcher"
        digitalName="menu-5"
        feedbackObject={feedbackObject}
        storedElements={storedElements}
      />
    </>
  );
};

DrivePages.propTypes = {
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

export default DrivePages;
