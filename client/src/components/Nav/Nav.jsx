import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex justify-center bg-blue-800">
      <div className="w-4/5 h-16 flex justify-between items-center">
        <Link className="text-white text-3xl" to="/">
          pern-shop
        </Link>
        <Link className="text-white" to="/login">
          Login/Register
        </Link>
      </div>
    </div>
  );
}

export default Nav;
