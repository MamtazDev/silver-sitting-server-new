const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const multer = require("multer");

const usersRoutes = require("./routes/usersRoutes");
const makeContactRoutes = require("./routes/makeContactRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const searchRoute = require("./routes/searchRoute");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const blogRoutes = require("./routes/blog.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const http = require("http");
const socketIo = require("socket.io");
const PdfModel = require("./models/pdf.model");
const server = http.createServer(app);

// _____________ Socket Start _____________
const io = socketIo(server, {
  cors: {
    origin: `${process.env.MAINWEBSITE_URL}`,
    credential: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("user send Message!: ", senderId, receiverId, text);

    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// _____________ Socket End _____________

// routes
app.use("/api/users", usersRoutes);
app.use("/api/makeContact", makeContactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/search", searchRoute);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Sever is running");
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const newPdf = new PdfModel({
      pdf: req.file.buffer,
      contentType: req.file.mimetype,
      user: req.body.user,
    });

    console.log("req.file.user:", req.body.user);

    await newPdf.save();

    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/pdf/:id", async (req, res) => {
  try {
    const pdf = await PdfModel.findById(req.params.id).populate("user");

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.setHeader("Content-Type", pdf.contentType);
    res.send(pdf.pdf);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/pdf", async (req, res) => {
  try {
    const pdfs = await PdfModel.find().populate("user");
    res.status(200).json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
