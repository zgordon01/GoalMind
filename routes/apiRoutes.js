
var express =require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TestGoal = require('../models/testgoal.js');


router.route('/goal')

	.get(function(req, res) {
		TestGoal.find(function(err, goals) {
			if (err)
				res.send(err);

			res.json(goals);
		});
});

router.route('/goal')

	.post(function(req, res) {


		var goal = new TestGoal();

		goal.title = req.body.title;
    goal.description = req.body.description;
    goal.points = req.body.points;


			goal.save(function(err) {
				if (err)
					res.send(err);

				res.json({message: 'Created Goal'});

			});

});
module.exports = router;
