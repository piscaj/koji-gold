import PropTypes from "prop-types";
import Linker from "./Linker";
import { Route, Routes } from "react-router-dom";
import ButtonShowcase from "../ButtonShowcase";
import Laptop from "../Laptop";
import RoomPc from "../RoomPc";
import Camera from "../Camera";
import VideoSwitching from "../VideoSwitching";

//This component just moves the clutter of React Router and the
//Linker component out of the Main component to clean things up.
//We drive all the pages here

//React Router routes go here
export const DriveRoutes = ({ sendMessage }) => {
  return (
    <Routes>
      <Route exact path="/" element={<RoomPc sendMessage={sendMessage} />} />
      <Route path="/roomPc" element={<RoomPc sendMessage={sendMessage} />} />
      <Route path="/laptop" element={<Laptop sendMessage={sendMessage} />} />
      <Route path="/camera" element={<Camera sendMessage={sendMessage} />} />
      <Route
        path="/switcher"
        element={<VideoSwitching sendMessage={sendMessage} />}
      />
      <Route
        path="/showcase"
        element={<ButtonShowcase sendMessage={sendMessage} />}
      />
    </Routes>
  );
};

DriveRoutes.propTypes = {
  sendMessage: PropTypes.func,
  feedbackObject: PropTypes.object,
  storedElements: PropTypes.array,
};

//Make use of the Linker component for page tracking here.
export const DriveLinks = () => {
  return (
    <>
      <Linker link="/roomPc" digitalName="menu-1" />
      <Linker link="/laptop" digitalName="menu-2" />
      <Linker link="/camera" digitalName="menu-3" />
      <Linker link="/showcase" digitalName="menu-4" />
      <Linker link="/switcher" digitalName="menu-5" />
    </>
  );
};

DriveLinks.propTypes = {};
