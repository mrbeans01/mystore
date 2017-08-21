const mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// create a schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};



module.exports = mongoose.model('users', UserSchema);
