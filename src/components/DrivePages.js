import PropTypes from "prop-types";
import Linker from "./Linker";
import { Route, Routes } from "react-router-dom";
import ButtonShowcase from "./ButtonShowcase";
import Laptop from "./Laptop";
import RoomPc from "./RoomPc";
import Camera from "./Camera";
import VideoSwitching from "./VideoSwitching";

//This component just moves the clutter of React Router and the fancy
//Linker component out of the Main component to clean things up.
//Drive all the pages here

//React Router routes go here
export const DriveRoutes = ({
  websocketObject,
  feedbackObject,
  storedElements,
}) => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <RoomPc
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        }
      />
      <Route
        path="/roomPc"
        element={
          <RoomPc
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        }
      />
      <Route
        path="/laptop"
        element={
          <Laptop
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        }
      />
      <Route
        path="/camera"
        element={
          <Camera
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        }
      />
      <Route
        path="/switcher"
        element={
          <VideoSwitching
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        }
      />
      <Route
        path="/showcase"
        element={
          <ButtonShowcase
            websocketObject={websocketObject}
            feedbackObject={feedbackObject}
            storedElements={storedElements}
          />
        }
      />
    </Routes>
  );
};

DriveRoutes.propTypes = {
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

//Make use of the Linker component for page tracking here.
export const DriveLinks = ({ feedbackObject, storedElements }) => {
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

DriveLinks.propTypes = {
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};
