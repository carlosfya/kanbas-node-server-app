// const express = require("express");
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import UserRoutes from "./users/routes.js";
import cors from "cors";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Kanbas"

mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(4000);