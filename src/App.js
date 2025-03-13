// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Navbar from "./components/navBar";
import { store } from "./utils/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen ">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
