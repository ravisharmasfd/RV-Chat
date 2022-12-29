import express from 'express';
import helmet from 'helmet';
import {databaseConnect} from './database/mongoConnect.js';
import router from './routes/index.js';
import cors from 'cors';
import { PORT } from './config/config.js';
import {Server} from "socket.io";

const app = express();

const port = PORT || 5000;
databaseConnect();
console.log("connected to mongo successfully");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/v1',router);




app.get("/", (req, res) => {
  res.send("hello");
});


const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("addNewUser", (newUserId) => {
    if (!activeUsers.some((user) => user._id === newUserId)) {
      activeUsers.push({_id:newUserId,socketId:socket.id});
    }
    io.emit("getUser", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUser", activeUsers);
  });

  socket.on("sendMessage", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user._id === receiverId);
    if (user) {
      io.to(user.socketId).emit("receiveNewMessage", data);
    }
  });
});
