
var express =require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var TestGoal = require('../models/testgoal.js');
var SmartGoal = require('../models/smartgoal.js');


router.route('/goal')

	.get(function(req, res) {
		SmartGoal.find(function(err, goals) {
			if (err)
				res.send(err);

			res.json(goals);
		});
});

router.route('/goal')

	.post(function(req, res) {


		var goal = new SmartGoal();

		goal.title = req.body.title;
    goal.description = req.body.description;
    goal.user_id = req.body.user_id;
		goal.user_token = req.body.user_token;
    goal.difficulty = req.body.difficulty;
		goal.goal_type = req.body.goal_type;
		if (req.body.due_date)
		{
			goal.due_date = req.body.due_date;
		}
		goal.repeat = req.body.repeat;


			goal.save(function(err) {
				if (err)
					res.send(err.message);
				else
					res.json({message: 'Created Goal'});

			});

});
module.exports = router;
