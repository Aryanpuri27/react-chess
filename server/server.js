const express = require("express");
const app = express();
const PORT = 4000;
const dotenv = require(`dotenv`);
const mongoose = require("mongoose");
const userRoute = require("./router/userRouter");
const User = require("./model/userModel");
const Game = require("./model/boardModel");
//New imports
const http = require("http").Server(app);
const cors = require("cors");
// app.use(cookieParser());
app.use(cors());
app.use(express.json());
dotenv.config({ path: `${__dirname}/config.env` });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection SucessFull 😎");
  });
app.use("/auth", userRoute);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

function generateRandomId(length) {
  return Math.random()
    .toString(36)
    .substr(2, length || 8);
}
// const randomId = generateRandomId(10);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.join(socket.id);
  socket.emit("abcd", socket.id);
  socket.on("clientMessage", (d) => {
    console.log(d);
  });
  socket.on("connectit", async (data) => {
    await User.findOneAndUpdate(
      { _id: data._id }, // Search criteria
      { SocketId: socket.id, online: true }, // Update data
      { new: true } // Options: Return the updated document
    );
    const newuser = await User.find({ _id: data._id });
    if (newuser) {
      socket.join(newuser.GameRoom);
    }
    socket.emit("changeuser", newuser);
  });

  socket.emit("msg", "hiii");

  socket.on("matchinvite", async (data) => {
    const opp = await User.find({ _id: data.to });
    socket.to(opp[0].SocketId).emit("matchinvitereq", data.from, opp);
    console.log("done...");
  });

  socket.on("accept", async (d, user) => {
    console.log("d", d.SocketId);
    const opp = await User.find({ _id: d._id });
    const randomid = generateRandomId(8);
    await User.findOneAndUpdate(
      { _id: d._id },
      { GameRoom: randomid, online: false }, // Update data
      { new: true } // Options: Return the updated document);
    );
    // socket.join(randomid);
    console.log(opp[0].SocketId);
    socket.to(opp[0].SocketId).emit("accepted", randomid, d._id, user._id);
  });

  function randStr(str1, str2) {
    if (!str1) {
      return str2;
    }
    if (!str2) {
      return str1;
    }
    console.log("str1", str1);
    console.log("str2", str2);
    const randomNumber = Math.random();
    const str = randomNumber < 0.5 ? str1 : str2;
    console.log("str", str);
    return str;
  }
  socket.on("joinroom", async (gameid, from, to) => {
    // socket.join(randomid);
    console.log("join room gameid", gameid);
    console.log("join room from", from);
    console.log("join room to", to);
    await User.findOneAndUpdate(
      { _id: to },
      { GameRoom: gameid, online: false }, // Update data
      { new: true } // Options: Return the updated document);
    );

    const newGame = await Game.create({
      GameRoom: gameid,
      chalenger: from,
      accepter: to,
      white: randStr(from, to),
    });
  });

  socket.on("getgame", async (d) => {
    console.log("getgame", d.GameRoom);
    const game = await Game.findOne({ GameRoom: d.GameRoom });
    if (!game) {
      socket.emit("nogame");
    }
    console.log("game", game);
    if (game) {
      const opp = await User.findOne({ _id: game.chalenger });
      const acc = await User.findOne({ _id: game.accepter });
      socket.emit("gamedata", game, opp, acc);
    }
  });

  socket.on("boardchange", async (board, to) => {
    const opp = await User.findOne({ _id: to._id });
    socket.to(opp.SocketId).emit("newboard", board);
  });
  socket.on("endoppkill", async (kills, to) => {
    console.log("to", to);
    console.log("inside change board");
    const opp = await User.findOne({ _id: to._id });
    socket.to(opp.SocketId).emit("kills", kills);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
