import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material//styles";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import MenuLeft from "../MenuLeft";
import "./scss/Main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheeseburger,
  faSun,
  faMoon,
} from "@fortawesome/pro-duotone-svg-icons";
import MediaVolume from "../MediaVolume";
import logoDark from "./images/logoDark.png";
import logoLight from "./images/logoLight.png";
import { DriveLinks, DriveRoutes } from "../DrivePages";
import { deepOrange, grey, indigo } from "@mui/material/colors";
import PowerButton from "../PowerButton";

const Main = () => {
  const [ws, wsState] = useState({ socket: null });
  const [fbObjects, fbObjectsState] = useState({ fb: null });
  const [wsStore, wsStoreState] = useState([
    { id: "null", value: "null", type: "null" },
  ]);
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
      var ws = new WebSocket("wss://192.168.2.29:49797");
      //var ws = new WebSocket("wss://79shawsheen.mycrestron.com:49797");
      console.warn("New socket created");

      const sendMessage = (data) => {
        try {
          ws.send(data);
        } catch (error) {
          console.warn("Main component websocket problem");
          console.log(error);
        }
      };

      ws.onopen = () => {
        wsState({ socket: ws });
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
      ws.onclose = (event) => {

        
        console.log( "Error: " + event.code);

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
          primary: {
            ...indigo,
            ...(mode === "light" && {
              main: indigo[900],
            }),
          },
          secondary: {
            ...deepOrange,
            ...(mode === "light" && {
              main: deepOrange[900],
            }),
          },
          ...(mode === "dark" && {
            primary: {
              main: indigo[100],
            },
            secondary: {
              main: deepOrange[300],
            },
          }),
          text: {
            ...(mode === "light"
              ? {
                  primary: grey[900],
                  secondary: grey[800],
                }
              : {
                  primary: "#fff",
                  secondary: grey[500],
                }),
          },
        },
      }),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="container">
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
        <MenuLeft
          serialName={"menu-index"}
          feedbackObject={fbObjects}
          storedElements={wsStore}
          websocketObject={ws}
          ref={menuLeft}
        />
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
        <Box className="body">
          <DriveRoutes
            websocketObject={ws}
            feedbackObject={fbObjects}
            storedElements={wsStore}
          />

          <DriveLinks feedbackObject={fbObjects} storedElements={wsStore} />
        </Box>
        <Box className="footer">
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "300px",
              }}
            >
              <MediaVolume
                serialName="media_volume"
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            </Box>
            <Box
              sx={{
                p: "3px",
                ml: "auto",
              }}
            >
              <PowerButton
                digitalName="power-off"
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
