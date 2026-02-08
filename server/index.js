const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io"); // 1. Import Socket.io
const http = require("http");

// Routes
const authRoute = require("./routes/auth.route");
const gigRoute = require("./routes/gig.route");
const orderRoute = require("./routes/order.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");

dotenv.config();
const app = express();
const server = http.createServer(app); // 2. Create HTTP Server

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 3. Socket.io Connection Logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // This sends the message to everyone in the room except the sender
    socket.to(data.conversationId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.log(err));

// 4. Change app.listen to server.listen
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Real-time Server running on port ${PORT}`);
});