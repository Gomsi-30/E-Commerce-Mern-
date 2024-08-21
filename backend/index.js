import express from "express"; 
import dotenv from 'dotenv';
import {app} from "./app.js";
import { connectDB } from "./config/database.js";

dotenv.config();

//connecting
connectDB()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down...');

  server.close(() => {
    process.exit(1); // Exit the process after the server is closed
  });
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException! Shutting down...');
    process.exit(1); // Exit the process after the server is closed
});

