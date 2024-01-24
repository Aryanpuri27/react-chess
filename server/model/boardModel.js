const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  GameRoom: {
    type: String,
    required: [true, "gameid required"],
  },
  chalenger: {
    type: String,
    required: [true, "game must have chalender"],
  },
  accepter: {
    type: String,
    required: [true, "game must have accepter"],
  },
  white: {
    type: String,
    required: [true, "game must have white"],
  },
  result: {
    type: String,
  },
});
const boardModel = mongoose.model("Board", boardSchema);
module.exports = boardModel;
