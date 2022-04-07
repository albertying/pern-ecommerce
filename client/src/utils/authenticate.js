import { useDispatch } from "react-redux";
import {
  login,
  setUserEmail,
  setUserName,
} from "../components/Login/loginSlice";

import { Buffer } from "buffer";

const authenticate = (token) => {
  const payload = Buffer.from(token.split(".")[1], "base64");
  const payloadDecoded = JSON.parse(payload.toString("ascii"));
  return {
    email: payloadDecoded.email,
    name: payloadDecoded.name,
  };
};

export default authenticate;
