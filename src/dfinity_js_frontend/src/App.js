import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrucksPage from "./pages/Trucks";
import UsersPage from "./pages/Users";
import CollectionsPage from "./pages/Collections";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UsersPage />} />
        <Route path="/trucks" element={<TrucksPage />} />
        <Route path="collections" element={<CollectionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
