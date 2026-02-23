import "dotenv/config";
import express from "express";
import db from "./db.js";

const app = express();

const port = Number(process.env.PORT ?? 3000);
db.getConnection((err, pool) => {
  if (err) console.error(err);
  else {
    console.log("db connected!");
    pool.destroy();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
