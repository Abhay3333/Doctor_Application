import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import PublicRoutes from "./Public/PublicRoutes";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      <Router>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border " role="status" />
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
