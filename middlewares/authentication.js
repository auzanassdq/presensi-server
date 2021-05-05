"use strict";

require("dotenv").config()
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) throw new Error("invalid token");
    
    const token = authToken.split(" ")[1]
    if (!token) throw new Error("invalid token");

    const user = jwt.verify(token, SECRET_KEY);

    req.user = user

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
