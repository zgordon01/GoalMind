
var express =require('express');
var router = express.Router();
var SmartGoal = require('../models/smartgoal.js');


router.route('/')

	.get(function(req, res) {
		SmartGoal.find(function(err, goals) {
			if (err){
				res.status(500).send(err);
			}
			res.json(goals);
		});
});

router.route('/byuser')
	.post(function(req, res) {
		var query = {};
		query.user_id = req.body.user_id;
		SmartGoal.find(query, function (err, goals) {
			if (err)
			{
				res.status(500).send(err);
			}
			res.json(goals);
		});
	});

router.route('/complete')
	.post(function(req, res) {
		goal = SmartGoal.findById(req.body.goal_id, function(err, goal) {
			if (err)
			{
				res.status(500).send(err);
			}
			goal.complete = true;
			goal.user_id = req.body.user_id;
			goal.user_token = req.body.user_token;

			/*
				Code for calculating points earned
				Send points to user object, add points earned to JSON response

			*/

			goal.save(function(err) {
				if (err)
				{
					res.status(500).send(err.message);
				}
				else {
					res.json({message: "Goal set as complete."});
				}
			});
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
		goal.due_date = req.body.due_date;
		goal.repeat = req.body.repeat;
		goal.complete = false;


			goal.save(function(err) {
				if (err){
					res.status(500).send(err.message);
				}
				else{
					res.json({message: 'Created Goal'});
				}
			});

});

router.route('/update')
	.post(function(req, res) {
		goal = SmartGoal.findById(req.body.goal_id, function(err, goal) {
			if (err)
			{
				res.status(500).send(err);
			}
			goal.title = req.body.title;
	    goal.description = req.body.description;
	    goal.user_id = req.body.user_id;
			goal.user_token = req.body.user_token;
	    goal.difficulty = req.body.difficulty;
			goal.goal_type = req.body.goal_type;
			goal.due_date = req.body.due_date;
			goal.repeat = req.body.repeat;

			goal.save(function(err) {
				if (err)
				{
					res.status(500).send(err.message);
				}
				else {
					res.json({message: "Goal successfully updated."});
				}
			});
		});
	});
module.exports = router;
