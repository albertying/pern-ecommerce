import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, setUserEmail, setUserName } from "../Login/loginSlice";

import authenticate from "../../utils/authenticate";

function Home() {
  const name = useSelector((state) => state.login.name);
  const email = useSelector((state) => state.login.email);
  const dispatch = useDispatch();
  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      if (response.status === 200) {
        const data = authenticate(localStorage.token);
        dispatch(login());
        dispatch(setUserEmail(data.email));
        dispatch(setUserName(data.name));
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    isAuth();
  }, []);
  return (
    <div className="text-white">
      <h1>{JSON.stringify({ name })}</h1>
      <h1>{JSON.stringify({ email })}</h1>
    </div>
  );
}

export default Home;
