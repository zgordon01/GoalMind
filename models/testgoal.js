var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestGoalSchema = new Schema({
  title: String,
  description: String,
  points: {type: Number, default: 0}
});

module.exports = mongoose.model('TestGoal', TestGoalSchema);
