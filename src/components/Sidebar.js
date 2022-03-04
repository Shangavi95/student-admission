import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

export default (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/home">
        Home
      </a>
      <a className="menu-item" href="/university">
        University
      </a>
      <a className="menu-item" href="/admission">
        Admission
      </a>
    </Menu>
  );
};
