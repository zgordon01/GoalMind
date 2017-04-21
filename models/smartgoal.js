var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment= require('moment');

var diff = 'BURN LOW MEDIUM HIGH MAX'.split(' ');
var types = 'PRIORITY DUEDATE REPEAT'.split(' '); //can change these

//This section applies []
var SmartGoalSchema = new Schema({
  //All Goals Use These - Basic Attributes//
  user_id: {type: String, required: true},
  title: {type: String, required: true},
  notes: String,
  goal_type: {type: String, enum: types, required: true},

  date_created: {type: Date, default: moment()},
  due_date: Date,
  over_due: Boolean,

  is_complete: Boolean, //Simple true or false - true means item is removed from active list,
  completed_at: [Date], //Only repeats will get multiple entries.  But all goals have this array with one entry when complete.
  urgency_level: {type: Number, default: 0}, //For ordering algorithm

  repeat_times: Number,
  times_this_week: 0,
  times_today: 0,
  points_history: [{date: Date, points : Number}]

});


SmartGoalSchema.pre('save', function(next){
  this.priorityLevel=0;

  if (this.goal_type == "DUEDATE" && !this.due_date)
  {
    return next(new Error("ERROR: Must set due_date when goal_type is DUEDATE"));
  }
  else if (this.goal_type == "REPEAT" && !this.repeat_times)
  {
    return next(new Error("ERROR: Must set repeat when goal_type is REPEAT"));
  }

  next();

});

module.exports = mongoose.model('SmartGoal', SmartGoalSchema);
