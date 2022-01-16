import React, { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material//styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MenuLeft from "./MenuLeft";
import ButtonShowcase from "./ButtonShowcase";
import Laptop from "./Laptop";
import RoomPc from "./RoomPc";
import Camera from "./Camera";
import "./scss/Main.scss";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheeseburger,
  faSun,
  faMoon,
} from "@fortawesome/pro-duotone-svg-icons";

const Main = () => {
  const [ws, wsState] = useState({ socket: null });
  const [fbObjects, fbObjectsState] = useState({ fb: null });
  const [wsStore, wsStoreState] = useState();
  const [loader, setLoader] = useState({ value: false });
  const [mode, setMode] = React.useState("light");
  const menuLeft = useRef();
  var wsStoredElements = [{ id: "null", value: "null", type: "null" }];

  const connect = () => {
    var ws = new WebSocket("wss://192.168.2.29:1851");

    wsState({ socket: ws });

    ws.onopen = () => {
      sendMessage("get_json=all\x0d\x0a");
      console.log("Requsting update from processor");
      setLoader({ value: true });
    };

    ws.onmessage = (event) => {
      if (event.data === "HB") {
        sendMessage("ACK\x0d\x0a");
        console.log("Heartbeat sent");
        wsStoreState(wsStoredElements);
        setLoader({ value: false });
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

    const sendMessage = (data) => {
      try {
        ws.send(data);
      } catch (error) {
        console.warn("Main component websocket problem");
        console.log(error);
      }
    };

    ws.onclose = () => {
      //Try a reconnect in 3 seconds
      setTimeout(() => check(), 3000);
    };

    const check = () => {
      if (!ws.socket || ws.socket.readyState === WebSocket.CLOSED) {
        connect();
      }
    };

    ws.onerror = (err) => {
      console.warn("Socket error: ", err.message, "Closing socket");
      ws.close();
    };
  };
  useEffect(() => {
    connect();
    return () => {
      console.warn("App exiting");
    };
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
        <MenuLeft ref={menuLeft} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <IconButton
            className="burger-menu"
            onClick={() => menuLeft.current.toggleDrawer()}
          >
            <FontAwesomeIcon icon={faBars} size="lg" className="icon-bars" />
            <FontAwesomeIcon
              icon={faCheeseburger}
              size="lg"
              className="icon-burger"
            />
          </IconButton>
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

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Laptop
                websocketObject={ws}
                feedbackObject={fbObjects}
                storedElements={wsStore}
              />
            }
          />
          <Route
            exact
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
            exact
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
            exact
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
            exact
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
      </Container>
    </ThemeProvider>
  );
};

export default Main;
