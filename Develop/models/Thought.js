const mongoose = require('mongoose');
const ReactionSchema = require("./Reaction");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ThoughtSchema = new Schema({
  thoughtId: {
    type: ObjectId,
    default: mongoose.Types.ObjectId
  },
  thoughtText: String,
  createdAt: {
    type: Date,
    get: getCreateDate,
    default: Date.now
  },
  username: String,
  reactions: [ReactionSchema]
});

function getCreateDate(date) {
  if (!date) return date;
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

ThoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
