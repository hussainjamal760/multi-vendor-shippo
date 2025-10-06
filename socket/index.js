const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();

// ✅ Allow frontend domains (local + Render)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://multi-vendor-shippo-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

// Create HTTP server (⚠️ Correct way)
const server = http.createServer(app);

// ✅ Proper socket.io setup with CORS
const io = socketIO(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://multi-vendor-shippo-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
  },
});

// ===============================
// SOCKET.IO LOGIC
// ===============================
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log("✅ User connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  const messages = {};

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// ✅ FIXED: Only use PORT number (Render provides process.env.PORT)
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Socket server running on port ${PORT}`);
});
