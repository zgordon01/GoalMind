var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_id: {type: String, required: true},
  user_token: {type: String, required: true},
  points: {type: Number, default: 0},
  level: {type: Number, default: 1},
  pointsToNext: {type: Number, default: 0}//,
//  Achievements: {Achievements here?}
});

module.exports = mongoose.model('UserObject', UserSchema);
