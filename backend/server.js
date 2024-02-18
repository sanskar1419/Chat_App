import express from "express";

const app = new express();

app.get("/", (req, res) => {
  res.send("Welcome to chat app");
});

app.listen(9000, () => {
  console.log("Server is listening to port 9000");
});
