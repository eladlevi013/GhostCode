import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Navbar from "./Components/Navbar/Navbar";
import Game from "./Game";
import AuthPanel from "./Components/AuthPanel/AuthPanel";
import BadgeModal from "./Components/BadgeModal/BadgeModal";
import { Provider } from "react-redux";
import store from "./redux/store";
import PageNotFound from "./PageNotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <BadgeModal />
      <AuthPanel />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  </Provider>
);
