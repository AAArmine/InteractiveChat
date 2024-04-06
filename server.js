const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const fs = require("fs");
const formatMessage = require("./app/utils/messages");

const app = express();
const server = http.createServer(app);
const usersFilePath = path.join(__dirname, "public/users.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  let users = [];
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing users file:", parseError);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = { username, password };
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users), "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing users file:", writeErr);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).redirect("/login.html");
    });
  });
});

const io = socket(server);

io.on("connection", (socket) => {
  socket.broadcast.emit("message", formatMessage("BOT", "A user connected!"));
  socket.emit("message", formatMessage("BOT","Welcome User!"));
  socket.on("chatMsg", (message) => {
    io.emit("message", formatMessage("USER", message));
  });
  socket.on("disconnect", () => {
    io.emit("message", formatMessage("BOT","A user disconnected!"));
  });
});

server.listen(3000, () => {
  console.log("Server listens to port 3000");
});
