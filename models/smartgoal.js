var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment= require('moment');

var diff = 'BURN LOW MEDIUM HIGH MAX'.split(' ');
var types = 'PRIORITY DUEDATE REPEAT'.split(' '); //can change these
var rep = 'DAILY WEEKLY MONTHLY'.split(' '); //can change these


var SmartGoalSchema = new Schema({
  title: {type: String, required: true},
  notes: String,
  user_id: {type: String, required: true},
  user_priority: {type: String, enum:diff},
  goal_type: {type: String, enum: types, required: true},
  due_date: Date,
  repeat_times: Number,
  is_complete: Boolean,
  completed_at: [Date],
  times_this_week: Number,
  times_today: Number,
  urgency_level: Number,
  over_ue: Boolean,
  date_created: {type: Date, default: moment().format()}

});


SmartGoalSchema.pre('save', function(next){
  this.priorityLevel=0;
  this.overDue=false;
  if (this.goal_type == "DUEDATE" && !this.due_date)
  {
    return next(new Error("ERROR: Must set due_date when goal_type is DUEDATE"));
  }
  if (this.goal_type == "PRIORITY" && !this.user_priority)
  {
    return next(new Error("ERROR: Must set priority when goal_type is PRIORITY"));
  }
  else if (this.goal_type == "REPEAT" && !this.repeat_times)
  {
    return next(new Error("ERROR: Must set repeat when goal_type is REPEAT"));
  }


  next();

});

module.exports = mongoose.model('SmartGoal', SmartGoalSchema);
