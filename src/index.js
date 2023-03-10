import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { injectStore } from "./redux/axiosPrivate";
import store from "./redux/store";
injectStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
