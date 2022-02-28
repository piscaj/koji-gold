import React, { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
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
import MenuLeft from "./MenuLeft";
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
import { DriveLinks, DriveRoutes } from "./DrivePages";
import { deepOrange, grey, indigo } from "@mui/material/colors";
import PowerButton from "./PowerButton";
import useLocalStorage from "./local-storage";
import { useSelector, useDispatch } from "react-redux";
import update from "./redux/feedbackSlice";

const Main = () => {
  const [wsStore, wsStoreState] = useState([
    { id: "null", value: "null", type: "null" },
  ]);
  const [updateStore, updateStoreState] = useState([]);
  const [loader, setLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    active: false,
    severity: "info",
    title: "None",
    message: "None",
  });
  const [mode, setMode] = useLocalStorage("mode", "light");
  const menuLeft = useRef();

  const clearAlert = () => {
    alertMessage.active === true
      ? setAlertMessage({ active: false })
      : setAlertMessage({ active: true });
  };

  //const socketUrl = "wss://192.168.2.29:49797";
  const socketUrl = "wss://79shawsheen.mycrestron.com:49797";
  const empty = { fb_objects: [{ id: "", value: "", type: "" }] };
  const didUnmount = useRef(false);

  const reduxStateTest = useSelector((state) => state.feedback.value);
  const dispatch = useDispatch();

  //Stuff to do only once when the app starts.
  useEffect(() => {
    setLoader(true);
    return () => {
      didUnmount.current = true;
    };
  }, []);

  //Websocket connection
  const { sendMessage, lastJsonMessage, lastMessage, readyState } =
    useWebSocket(socketUrl, {
      shouldReconnect: (closeEvent) => {
        setAlertMessage({ active: false });
        setAlertMessage({
          active: true,
          severity: "info",
          title: "Whoops!",
          message: "The Websocket lost connection.",
        });
        return didUnmount.current === false;
      },
      reconnectAttempts: 10,
      reconnectInterval: 1000,
      retryOnError: true,
      onReconnectStop: (number) => {
        setAlertMessage({ active: false });
        setAlertMessage({
          active: true,
          severity: "error",
          title: "Yikes! I tried reconnecting " + number + " times.",
          message:
            "We have a problem reaching - " +
            socketUrl +
            ". Check your network connection, then refresh your browser",
        });
      },
      onOpen: () => {
        //Each time the socket opens perform a full update.
        //This seems pretty costly but its the only option at the
        //moment with this API.
        sendMessage("get_json=all\x0d\x0a");
        console.log("Requsting update from processor");
      },
      onClose: (event) => {
        //Report the reason the socket closed to the console
        console.error("Websocket closed - Code: " + event.code);
      },
      onError: () => {
        //Nothing to do at the moment
      },
    });

  //Manage the websocket heartbeat message
  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data === "HB") {
        sendMessage("ACK\x0d\x0a");
        console.log("Heartbeat sent");
        setLoader(false);
        setAlertMessage({ active: false });
      }
    }
  }, [lastMessage, sendMessage]);

  //Build a stored feedback array for components
  useEffect(() => {
    let mounted = true;
    var wsStoredElements = wsStore;
    console.log(reduxStateTest);
    // Check incomming ws json stream elements against the stored elements
    var foundIndex = wsStore.findIndex((x) => x.id === updateStore.id);

    // If we have a matching element value at id, overwrite it
    if (foundIndex >= 0) {
      wsStore[foundIndex].value = updateStore.value;

      if (!loader && mounted) {
        wsStoreState(wsStoredElements);
      }
    }
    // If we don't have a match lets push the element into the array
    else {
      wsStoredElements.push(updateStore);
      if (!loader && mounted) {
        wsStoreState(wsStoredElements);
      }
    }
    return () => {
      mounted = false;
    };
  }, [updateStore, wsStore, loader, reduxStateTest, dispatch]);

  //Process incomming json messages to be evaluated and put in stored feedback
  useEffect(() => {
    let mounted = true;
    if (lastJsonMessage !== null) {
      if (Object.keys(lastJsonMessage).length === 0) {
        //This is a fix for the "HB" that is not an empty json obj
        //pass if the json is empty {}
      } else {
        if (mounted) updateStoreState(lastJsonMessage.fb_objects[0]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [lastJsonMessage]);

  //Websocket state. Keep user aware of connection status.
  useEffect(() => {
    if (ReadyState.OPEN) {
      setAlertMessage({
        active: true,
        severity: "success",
        title: "Sweet!",
        message: "I'm connected to " + socketUrl,
      });
    } else if (ReadyState.CLOSING) {
      setAlertMessage({
        active: true,
        severity: "warning",
        title: "Ooops!",
        message: "Attempting to reconnect.",
      });
    }
  }, [readyState, socketUrl]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
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
          open={loader}
          onClick={() => {
            setLoader(false);
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
          feedbackObject={lastJsonMessage !== null ? lastJsonMessage : empty}
          storedElements={wsStore}
          sendMessage={sendMessage}
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
            sendMessage={sendMessage}
            feedbackObject={lastJsonMessage !== null ? lastJsonMessage : empty}
            storedElements={wsStore}
          />

          <DriveLinks
            feedbackObject={lastJsonMessage !== null ? lastJsonMessage : empty}
            storedElements={wsStore}
          />
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
                sendMessage={sendMessage}
                feedbackObject={
                  lastJsonMessage !== null ? lastJsonMessage : empty
                }
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
                sendMessage={sendMessage}
                feedbackObject={
                  lastJsonMessage !== null ? lastJsonMessage : empty
                }
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