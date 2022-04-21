const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const roomSchema = new Schema({
  players: [],
  gameName: { type: String },
  hostId: { type: String, default: null },
  handWinner: [],
  timer: { type: Number, default: 40 },
  emergencyTimer: { type: Number, default: 30 },
  firstGameTime: { type: Date },
  finish: { type: Boolean, default: false },
  tableId: { type: String },
  gameType: { type: String },
  invPlayers: [],
  watchers: [],
  public: { type: Boolean, default: false },
  allowWatcher: { type: Boolean, default: false },
  meetingId: { type: String },
  meetingToken: { type: String },
  media: { type: String },
  history: [],
  gameStatus: { type: Number, default: 80 },
  currentPosition: { type: Number, default: 0 },
  p1IsNext: { type: Boolean, default: false },
  dice: { type: Array, default: [0] },
  points: {
    type: Array,
    default: Array(24).fill({ player: false, checkers: 0 }),
  },
  grayBar: { type: Object, default: { checkersP1: 0, checkersP2: 0 } },
  outSideBar: { type: Object, default: { checkersP1: 15, checkersP2: 15 } },
  movingChecker: { type: Schema.Types.Mixed, default: false },
  playerStart: { type: String },
  minBet: { type: Number, default: 0 },
});

const roomModel = model("backgammon", roomSchema);

module.exports = roomModel;
