var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserHistory = new Schema({date_earned: Date, points_earned: Number});

var UserSchema = new Schema({
  user_id: {type: String, required: true},
  user_token: {type: String, required: true},
  points: {type: Number, default: 0},
  level: {type: Number, default: 1},
  pointsToNext: {type: Number, default: 0},
  //points_history: [{type:Date, type:Number}]
  points_history: [Date]
  //points_history: [UserHistory]
//  Achievements: {Achievements here?},
});




module.exports = mongoose.model('UserObject', UserSchema);
