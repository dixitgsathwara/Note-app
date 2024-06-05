const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date().getTime()
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
