const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("./jwt/generateToken");
const generateRefreshToken = require("./jwt/generateRefreshToken");
const authorization = require("./jwt/authorization");
const refreshTokenAuthorization = require("./jwt/refreshTokenAuthorization");

const express = require("express");
const { Router } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// routes

// Get user name given email

app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const getUser = await pool.query(
      "SELECT user_name FROM users WHERE user_email = $1",
      [email]
    );
    res.json({ name: getUser.rows[0].user_name });
  } catch (err) {
    console.error(err.message);
  }
});

// Register

app.post("/users", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (user_email, user_password, user_name) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT user_email FROM users WHERE user_email = $4) RETURNING *",
      [email, hashedPassword, name, email]
    );
    if (newUser.rows.length > 0) {
      res.json(newUser.rows[0]);
    } else {
      res.status(409).send("Email already exists");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (checkUser.rows.length > 0) {
      if (await bcrypt.compare(password, checkUser.rows[0].user_password)) {
        const accessToken = generateAccessToken(checkUser.rows[0].user_id);
        const refreshToken = generateRefreshToken(checkUser.rows[0].user_id);

        await pool.query(
          "INSERT INTO refreshtokens (refreshtoken) VALUES ($1)",
          [refreshToken]
        );

        res.json({ accessToken, refreshToken });
      } else {
        res.status(401).send("Incorrect email or password.");
      }
    } else {
      res.status(401).send("Incorrect email or password.");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// logout

app.delete("/logout", async (req, res) => {
  const refreshToken = req.header("refreshToken");
  try {
    await pool.query("DELETE FROM refreshtokens WHERE refreshtoken = $1", [
      refreshToken,
    ]);

    res.json("Token deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// authorization

app.get("/verify", authorization, async (req, res) => {
  try {
    res.json("Authorized");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// generate new token

app.post("/token", refreshTokenAuthorization, async (req, res) => {
  try {
    const accessToken = generateAccessToken(req.id);
    res.json({ accessToken });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// log message when server is online

const port = 5000;

app.listen(port, () => {
  console.log(`Server has started on http://localhost:${port}`);
});
