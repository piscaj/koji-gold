import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux'
import { store } from './components/redux/store'


ReactDOM.render(
    <Provider store = {store}>
      <Router >
        <div className="noselect">
          <App />
        </div>
      </Router>
      </Provider>,
  document.getElementById("root")
);

reportWebVitals();
