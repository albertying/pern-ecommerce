import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout, setUserEmail, setUserName } from "../Login/loginSlice";

function Nav() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center bg-blue-800">
      <div className="w-4/5 h-16 flex justify-between items-center">
        <Link className="text-white text-3xl" to="/">
          pern-shop
        </Link>

        <button
          className="text-white"
          onClick={() => {
            dispatch(logout());
            dispatch(setUserEmail(""));
            dispatch(setUserName(""));
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("id");
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Nav;
