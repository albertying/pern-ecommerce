import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedEmail = email.replace(/^\s+|\s+$/g, "");
    const updatedPassword = password.replace(/^\s+|\s+$/g, "");
    const updatedName = name.replace(/^\s+|\s+$/g, "");
    try {
      const body = {
        email: updatedEmail,
        password: updatedPassword,
        name: updatedName,
      };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setErrorMessage("Email already in use.");
      }
    } catch (err) {
      console.err(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="h-60">
        <h1 className="text-6xl text-gray-200 mt-48 mb-12">Register</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-6 w-96">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="name"
            >
              Your name
            </label>
            <input
              className="bg-neutral-800 text-gray-300 text-sm rounded-lg w-full p-2.5 focus: caret-white focus: outline-none"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="email"
            >
              Your Email
            </label>
            <input
              className="bg-neutral-800 text-gray-300 text-sm rounded-lg w-full p-2.5 focus: caret-white focus: outline-none"
              placeholder="example@example.com"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="password"
            >
              Your Password
            </label>
            <input
              className="bg-neutral-800 text-gray-300 text-sm rounded-lg w-full p-2.5 focus: caret-white focus: outline-none"
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-start items-center text-gray-300">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="Submit"
            >
              Register
            </button>
            <Link to="/login">
              <button className="text-white bg-blue-500 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-5">
                Login
              </button>
            </Link>
          </div>
          <h1 className="text-white py-4">{errorMessage}</h1>
        </form>
      </div>
    </div>
  );
}

export default Register;
