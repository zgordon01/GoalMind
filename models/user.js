var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_id: {type: Number, required: true},
  user_token: {type: String, required: true},
  points: {type: Number, default: 0}//,
//  Achievements: {Achievements here?}
});

module.exports = mongoose.model('UserObject', UserSchema);
