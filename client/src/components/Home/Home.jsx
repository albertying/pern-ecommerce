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
        headers: { accessToken: localStorage.accessToken },
      });

      if (response.status == 200) {
        const data = authenticate(localStorage.accessToken);
        localStorage.setItem("id", data.id);
        dispatch(login());
        dispatch(setUserEmail("bye"));
        dispatch(setUserName("hi"));
      } else {
        const body = { id: localStorage.id };
        const response = await fetch("http://localhost:5000/token", {
          method: "POST",
          headers: { refreshToken: localStorage.refreshToken },
          body: JSON.stringify(body),
        });

        if (response.status === 200) {
          const res = await response.json();
          localStorage.setItem("accessToken", res.accessToken);
          const data = authenticate(localStorage.accessToken);

          localStorage.setItem("id", data.id);

          dispatch(login());
          dispatch(setUserEmail("hye"));
          dispatch(setUserName("hi"));
        }
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
