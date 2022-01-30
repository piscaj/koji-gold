import React, { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material//styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import MenuLeft from "./MenuLeft";
import ButtonShowcase from "./ButtonShowcase";
import Laptop from "./Laptop";
import RoomPc from "./RoomPc";
import Camera from "./Camera";
import "./scss/Main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheeseburger,
  faSun,
  faMoon,
} from "@fortawesome/pro-duotone-svg-icons";
import MediaVolume from "./MediaVolume";
import logoDark from "./images/logoDark.png";
import logoLight from "./images/logoLight.png";
import Linker from "./Linker";
import VideoSwitching from "./VideoSwitching";

const Main = () => {
  const [ws, wsState] = useState({ socket: null });
  const [fbObjects, fbObjectsState] = useState({ fb: null });
  const [wsStore, wsStoreState] = useState();
  const [loader, setLoader] = useState({ value: false });
  const [alertMessage, setAlertMessage] = useState({
    active: false,
    severity: "info",
    title: "None",
    message: "None",
  });
  const [mode, setMode] = useState("light");
  const menuLeft = useRef();
  var wsStoredElements = [{ id: "null", value: "null", type: "null" }];

  const clearAlert = () => {
    alertMessage.active === true
      ? setAlertMessage({ active: false })
      : setAlertMessage({ active: true });
  };

  useEffect(() => {
    setLoader({ value: true });
    const connect = () => {
      //var ws = new WebSocket("wss://192.168.2.29:49797");
      var ws = new WebSocket("wss://79shawsheen.mycrestron.com:49797");
      console.warn("New socket created");
      wsState({ socket: ws });

      const sendMessage = (data) => {
        try {
          ws.send(data);
        } catch (error) {
          console.warn("Main component websocket problem");
          console.log(error);
        }
      };

      ws.onopen = () => {
        setAlertMessage({
          active: true,
          severity: "success",
          title: "Sweet!",
          message: "I'm connected to " + ws.url,
        });
        //setAlertMessage({ active: false, severity: "", message: "" });
        sendMessage("get_json=all\x0d\x0a");
        console.log("Requsting update from processor");
      };

      ws.onmessage = (event) => {
        if (event.data === "HB") {
          sendMessage("ACK\x0d\x0a");
          console.log("Heartbeat sent");
          wsStoreState(wsStoredElements);
          setLoader({ value: false });
          setAlertMessage({ active: false });
        } else {
          fbObjectsState({ fb: JSON.parse(event.data) });
          var newObject = JSON.parse(event.data).fb_objects[0];
          // Check incomming ws json stream elements against the stored elements
          var foundIndex = wsStoredElements.findIndex(
            (x) => x.id === newObject.id
          );
          // If we have a matching element value at id, overwrite it
          if (foundIndex >= 0) {
            wsStoredElements[foundIndex].value = newObject.value;
            if (!setLoader.value) wsStoreState(wsStoredElements);
          }
          // If we don't have a match lets push the element into the array
          else {
            wsStoredElements.push(JSON.parse(event.data).fb_objects[0]);
            if (!setLoader.value) wsStoreState(wsStoredElements);
          }
        }
      };
      ws.onclose = () => {
        setAlertMessage({
          active: true,
          severity: "warning",
          title: "Ooops!",
          message: "Attempting to reconnect.",
        });
        //Try a reconnect in 1 seconds
        setTimeout(() => check(), 1000);
      };

      const check = () => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
          connect();
        }
      };

      ws.onerror = (err) => {
        console.warn("Socket error: ", err.message, "Closing socket");
        ws.close();
      };
    };
    connect();
    return () => {
      ws.socket.close(1000, "Application closed");
      console.warn("Socket closed");
      console.warn("App exiting");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  var theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader.value}
          onClick={() => {
            setLoader({ value: false });
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: "5px" }}>
              <CircularProgress color="inherit" />
            </Box>
            <Box sx={{ p: "5px" }}>Updating</Box>
          </Box>
        </Backdrop>
        <MenuLeft websocketObject={ws} ref={menuLeft} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          className="header"
        >
          <Slide
            direction="down"
            in={alertMessage.active}
            mountOnEnter
            unmountOnExit
          >
            <Box
              className="alert"
              onClick={() => {
                clearAlert();
              }}
            >
              <Alert severity={alertMessage.severity}>
                <AlertTitle> {alertMessage.title}</AlertTitle>
                {alertMessage.message}
              </Alert>
            </Box>
          </Slide>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "45px",
              }}
            >
              <IconButton
                className="burger-menu"
                onClick={() => menuLeft.current.toggleDrawer()}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  size="lg"
                  className="icon-bars"
                />
                <FontAwesomeIcon
                  icon={faCheeseburger}
                  size="lg"
                  className="icon-burger"
                />
              </IconButton>
            </Box>
            <Box
              className="logo"
              sx={{
                ml: "5px",
                mt: "8px",
              }}
            >
              {theme.palette.mode === "dark" ? (
                <img src={logoDark} alt="" />
              ) : (
                <img src={logoLight} alt="" />
              )}
            </Box>

            <Box sx={{ ml: "auto", fontSize: "12px" }}>
              {theme.palette.mode} mode
              <IconButton
                sx={{ mb: "5px", mt: "5px" }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <FontAwesomeIcon icon={faMoon} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faSun} size="lg" />
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RoomPc
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
          <Route
            path="/roomPc"
            element={
              <RoomPc
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
          <Route
            path="/laptop"
            element={
              <Laptop
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
          <Route
            path="/camera"
            element={
              <Camera
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
          <Route
            path="/switcher"
            element={
              <VideoSwitching
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
          <Route
            path="/showcase"
            element={
              <ButtonShowcase
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
        </Routes>
        <Linker
          link="/roomPc"
          digitalName="menu-1"
          feedbackObject={fbObjects}
          storedElements={wsStore}
        />
        <Linker
          link="/laptop"
          digitalName="menu-2"
          feedbackObject={fbObjects}
          storedElements={wsStore}
        />
        <Linker
          link="/camera"
          digitalName="menu-3"
          feedbackObject={fbObjects}
          storedElements={wsStore}
        />
        <Linker
          link="/showcase"
          digitalName="menu-4"
          feedbackObject={fbObjects}
          storedElements={wsStore}
        />
            <Linker
          link="/switcher"
          digitalName="menu-5"
          feedbackObject={fbObjects}
          storedElements={wsStore}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: "20px",
          }}
        >
          <MediaVolume
            serialName="media_volume"
            websocketObject={ws}
            feedbackObject={fbObjects}
            storedElements={wsStore}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
