import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  const uderMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/about",
    },
    {
      id: 3,
      name: "Contact",
      path: "/contact",
    },
    {
      id: 4,
      name: "Login",
      path: "/login",
    },
    {
      id: 5,
      name: "Register",
      path: "/register",
    },
  ];
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>SH</h1>
          </div>
        </div>
        <div className="content">
          <div className="header">header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
