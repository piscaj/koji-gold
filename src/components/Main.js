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
import MenuLeft from "./widgets/MenuLeft";
import "./assets/scss/Main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheeseburger,
  faSun,
  faMoon,
} from "@fortawesome/pro-duotone-svg-icons";
import MediaVolume from "./widgets/MediaVolume";
import logoDark from "../components/assets/images/logoDark.png";
import logoLight from "../components/assets/images/logoLight.png";
import { DriveLinks, DriveRoutes } from "./widgets/DrivePages";
import { deepOrange, grey, indigo } from "@mui/material/colors";
import PowerButton from "./widgets/PowerButton";
import useLocalStorage from "./imports/local-storage";

import { useDispatch } from "react-redux";
import { updateMode } from "./redux/lightDarkModeSlice";
import postal from "postal";

const Main = () => {
  const [worker, setWorker] = useState(null);
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

  const dispatch = useDispatch();

  const didUnmount = useRef(false);

  useEffect(() => {
    const myWorker = new Worker(
      new URL("../workers/main.worker.js", import.meta.url)
    );
    setWorker(myWorker);
    return () => {
      myWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker) {
      worker.postMessage({
        connectionStatus: "init",
      });
    }
  }, [worker]);

  useEffect(() => {
    if (worker) {
      worker.onmessage = function (e) {
        if (typeof e.data === "string") {
          if (e.data.includes("[")) {
            console.log(e.data);
          }
        }
        if (typeof e.data === "object") {
          if (e.data.disableLoader !== undefined)
            setLoader(e.data.disableLoader);
          else if (e.data.disableAlert !== undefined)
            setAlertMessage({ active: e.data.disableAlert });
          else if (e.data.message === "STATE") {
            postal.publish({
              channel: e.data.channel,
              topic: e.data.topic,
              data: {
                value: e.data.data,
              },
            });
          } else if (e.data.message === "SOCKET-CLOSED") {
            setAlertMessage({
              active: true,
              severity: "warning",
              title: "Ooops!",
              message: "Attempting to reconnect.",
            });
          }
        }
      };
    }
  }, [worker]);

  useEffect(() => {
    const publishComponentMessage = postal.subscribe({
      channel: "publish",
      topic: "component.publish",
      callback: function (data, envelope) {
        if (worker) {
          worker.postMessage({
            publishComponentMessage: data,
          });
        }
      },
    });
    return () => {
      publishComponentMessage.unsubscribe();
    };
  }, [worker]);

  useEffect(() => {
    const componentNeedsUpdate = postal.subscribe({
      channel: "update",
      topic: "component.refresh",
      callback: function (data, envelope) {
        if (worker) {
          worker.postMessage({
            componentUpdate: data.value,
          });
        }
      },
    });
    return () => {
      componentNeedsUpdate.unsubscribe();
    };
  }, [worker]);

  //Stuff to do only once when the app starts.
  useEffect(() => {
    setLoader(true);
    return () => {
      didUnmount.current = true;
    };
  }, []);

  //Pass theme mode state to store
  useEffect(() => {
    dispatch(updateMode(mode));
    return () => {};
  }, [mode, dispatch]);

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
        <MenuLeft serialName={"menu-index"} ref={menuLeft} />
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
          <DriveRoutes />

          <DriveLinks />
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
              <MediaVolume serialName="media_volume" />
            </Box>
            <Box
              sx={{
                p: "3px",
                ml: "auto",
              }}
            >
              <PowerButton digitalName="power-off" />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
