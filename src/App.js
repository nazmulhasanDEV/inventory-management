import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navigation-bar/Index";
import Dashboard from "./components/dashboard/Index";
import Login from "./components/login/Index";
import AdminUserList from "./components/users/AdminUsers";
import AppContext from "./app-context/AppContext";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [modalProps, setModalProps] = useState({});

  return (
    <AppContext.Provider value={{ modalProps, setModalProps }}>
      <NavigationBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<AdminUserList />} />
        </Routes>
        <ToastContainer />
      </NavigationBar>
    </AppContext.Provider>
  );
}

export default App;
