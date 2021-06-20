const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Highscore = new Schema({
  name: String,
  difficulty: String,
  width: Number,
  height: Number,
  size: Number,
  time: Number,
  bombs: Number,
  percent: Number,
  date: Number,
});

module.exports = mongoose.model('Highscore', Highscore);
