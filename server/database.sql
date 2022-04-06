CREATE DATABASE pernecommerce;

-- create users table

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255),
  user_password VARCHAR(255)
);