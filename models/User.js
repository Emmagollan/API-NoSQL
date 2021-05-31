const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  userId: {
    type: ObjectId,
    default: mongoose.Types.ObjectId
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  thoughts: {
    type: [ObjectId],
    ref: 'Thought'
  },
  friends: {
    type: [ObjectId],
    ref: 'User'
  }
});

UserSchema.virtual('friendCount').get(() => this.friends.length);

const User = mongoose.model('User', UserSchema);

module.exports = User;
