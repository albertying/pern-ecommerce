const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");

const express = require("express");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

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
        res.send("success");
      } else {
        res.status(401).send("Incorrect email or passworddd.");
      }
    } else {
      res.status(401).send("Incorrect email or password.");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// log message when server is online

const port = 5000;

app.listen(port, () => {
  console.log(`Server has started on http://localhost:${port}`);
});
