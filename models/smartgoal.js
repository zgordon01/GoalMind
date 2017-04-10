var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment= require('moment');

var diff = 'BURN LOW MEDIUM HIGH MAX'.split(' ');
var types = 'PRIORITY DUEDATE REPEAT'.split(' '); //can change these


//var rep = 'DAILY WEEKLY MONTHLY'.split(' '); //can change these   <<Probably won't use this.

//This section applies []
var SmartGoalSchema = new Schema({
  //All Goals Use These - Basic Attributes//
  user_id: {type: String, required: true},
  title: {type: String, required: true},
  notes: String,
  goal_type: {type: String, enum: types, required: true},
  is_complete: Boolean, //Simple true or false - true means item is removed from active list,
  completed_at: [Date], //Only repeats will get multiple entries.  But all goals have this array with one entry when complete.
  urgency_level: Number, //For ordering algorithm
  over_due: Boolean, //over_due may not happen on priority but I'm thinkinb about a way to do it
  date_created: {type: Date, default: moment()},
  //END BASIC ATTRIBUTES

  //DUEDATE Goals = Basic Attributes + these
  due_date: Date,
  //PRIORITY Goals = Basic Attributes + these
  user_priority: {type: String, enum:diff},
  //REPEAT Goals = Basic Attributes + these
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
