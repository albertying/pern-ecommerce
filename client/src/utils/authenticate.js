import { Buffer } from "buffer";

const authenticate = (token) => {
  const payload = Buffer.from(token.split(".")[1], "base64");
  const payloadDecoded = JSON.parse(payload.toString("ascii"));
  console.log(payloadDecoded);
  return {
    id: payloadDecoded.id,
  };
};

export default authenticate;
