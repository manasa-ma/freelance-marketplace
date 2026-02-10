const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const http = require("http");


// Routes
const authRoute = require("./routes/auth.route");
const gigRoute = require("./routes/gig.route");
const orderRoute = require("./routes/order.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");

dotenv.config();
const app = express();
const server = http.createServer(app);

// 1. Socket.io Setup with Vercel URL
const io = new Server(server, {
  cors: {
    origin: "https://freelance-marketplace-alpha.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  },
});

// 2. Express Middleware
app.use(cors({ 
  origin: "https://freelance-marketplace-alpha.vercel.app", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
  allowedHeaders: ["Content-Type", "token"] // <--- THIS IS THE FIX: Allow our custom header
}));
app.use(express.json());
app.use(cookieParser());

// 3. Socket.io Connection Logic
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.conversationId).emit("receive_message", data);
  });
});

// 4. API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Freelancer API! Server is Live and Healthy.");
});

app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// 6. DYNAMIC PORT FOR DEPLOYMENT (This is the fix)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});