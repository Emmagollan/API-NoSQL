const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
    default: mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    minLength: 1,
    maxLength: 280,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    get: getCreateDate,
    default: Date.now
  }
});

function getCreateDate(date) {
  if (!date) return date;
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

// const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = ReactionSchema;
