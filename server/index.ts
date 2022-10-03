import express from "express";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors);
const port = process.env.PORT || 8080;

app.get("/api/test", (req, res) => {
  res.send("This is a test response!");
});

app.listen(port, () => {
  console.log("server started and binded to port successfully");
});
