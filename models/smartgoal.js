var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diff = 'LOW MEDIUM HIGH'.split(' ');
var types = 'OPEN SINGLE REPEAT'.split(' '); //can change these
var rep = 'DAILY WEEKLY MONTHLY'.split(' '); //can change these


var SmartGoalSchema = new Schema({
  title: {type: String, required: true},
  description: String, //Do we want description to be required?
  user_id: {type: String, required: true}, //Number or string?
  //user_token: {type: String, required: true}  <-- By removing from schema, token should not be stored in object
  difficulty: {type: String, enum: diff, required: true},
  goal_type: {type: String, enum: types, required: true},
  due_date: Date,
  repeat: {type: String, enum: rep},
  complete: Boolean

});


SmartGoalSchema.pre('save', function(next){
  if (this.goal_type == "SINGLE" && !this.due_date)
  {
    return next(new Error("ERROR: Must set due_date when goal_type is SINGLE"));
  }
  else if (this.goal_type == "REPEAT" && !this.repeat)
  {
    return next(new Error("ERROR: Must set repeat when goal_type is REPEAT"));
  }
  next();

});

module.exports = mongoose.model('SmartGoal', SmartGoalSchema);
