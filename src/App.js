import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navigation-bar/Index";
import Dashboard from "./components/dashboard/Index";
import Login from "./components/login/Index";

function App() {
  return (
    <>
      <NavigationBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </NavigationBar>
    </>
  );
}

export default App;
