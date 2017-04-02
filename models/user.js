var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_id: {type: String, required: true},
  user_token: {type: String, required: true},
  points: {type: Number, default: 0},
  level: {type: Number, default: 1},
  pointsToNext: {type: Number, default: 0},
  points_history:
  [
    {date_earned: Date, points_earned: Number}
  ]
//  Achievements: {Achievements here?},
});

UserSchema.methods.get_points_history = function() {
  return this.points_history;
};
UserSchema.methods.push_points_history = function() {

}


module.exports = mongoose.model('UserObject', UserSchema);
