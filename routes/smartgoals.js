
var express =require('express');
var router = express.Router();
var moment = require('moment');
var SmartGoal = require('../models/smartgoal.js');
var realDate = moment();
realDate.format();

var date = realDate;
var currentWeek = moment(date).week();
//Variables to determine when the priority level goals max out their priority, for ordering
var daysToMaxHigh=7;
var daysToMaxMedium=10;
var daysToMaxLow=14;


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
		var query = {}
		query.user_id = res.locals.user_id;

		SmartGoal.find(query, function (err, goals) {
			if (err)
			{
				res.status(500).send(err);
			}
			else{
				updateRepeats(goals);



				var query = {}
				query.user_id = res.locals.user_id;
				query.complete = false;
				SmartGoal.find(query, function (err, goals) {
					if (err)
					{
						res.status(500).send(err);
					}
					else {
						//console.log(goals);
						updatePriorities(goals);
						res.send(goals);
					}
			});
		}});
	});

	router.route('/byuser/history')
		.post(function(req, res) {
			var query = {}
			query.user_id = res.locals.user_id;
			query.complete = true;

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
	SmartGoal.findById(req.body.goal_id, function(err, goal) {
		if (err)
		{
			res.status(500).send(err);
		}
		//console.log("===================================");
			goal.complete=false;
			var realDate = moment();
			realDate.format();
			var date = realDate;
			var currentWeek = moment(date).week();
			goal.completeDates.addToSet(date.format());
			//console.log("adding to set: " + date.format());
			//console.log("for goal: " + goal._id);
			if(goal.goal_type !== "REPEAT")
			{
				goal.complete=true;
				/*
				CODE HERE FOR GIVING USER points
				THIS IS WHEN THEY HAVE COMPLETED THEIR NON REPEATING GOAL
				*/
			}
			else {
				var thisWeek=0;
				goal.complete=false;

				goal.completeDates.forEach(function (eachDate)
				{
					//console.log("current : " + currentWeek);
					//console.log("goal: " + moment(eachDate).week());

					if (moment(eachDate).week() == currentWeek)
					{
						thisWeek++;
						//console.log("found a match this week");
					}
				});
				goal.completesThisWeek=thisWeek;
				if(goal.repeat == thisWeek || goal.repeat < thisWeek)
				{
					goal.complete=true;
					/* CODE FOR GIVING USER POINTS */
					/* THIS IS WHEN THEY HAVE COMPLETED THEIR SET AMOUNT OF REPEATS PER WEEK */
				}
				else
				{
					goal.complete=false;
				}
			}
		goal.save(function(err) {
			if (err)
			{
				res.status(500).send(err.message);
			}
			else {
				//console.log(goal);
				res.status(200).json({message: "Goal Complete!"});
			}
		});
	});
});
router.delete('/delete/:goal_id', function(req,res) {
	SmartGoal.findById(req.params.goal_id)
		.exec(function(err, doc) {
			if (err || !doc){
				res.statusCode = 404;
				res.send({});
			}else {
				doc.remove(function(err) {
					if(err) {
						res.statusCode=403;
						res.send(err);

					}else {
						res.statusCode=200;
						res.send({message: "Goal Deleted"});
					}
				})
			}
		})
	});

router.route('/')

    .post(function(req, res) {
        var goal = new SmartGoal();
        if (req.body.title && req.body.goal_type) {
						if (req.body.notes)
						{
							goal.notes = req.body.notes;
						}
            if (req.body.repeat) {
                goal.repeat = req.body.repeat;
            }
            if (req.body.due_date) {
                goal.due_date = req.body.due_date;
            }
            goal.title = req.body.title;
            goal.goal_type = req.body.goal_type;

							if(req.body.priority)
							{
								goal.priority=req.body.priority;
							}

            goal.complete = false;
						goal.completesThisWeek = 0;

			goal.user_id = res.locals.user_id;
					console.log(goal);
            goal.save(function(err) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        message: 'Created Goal'
                    });
                }
            });
        } else {
            res.status(400).json({
                message: "Must send required parameters"
            });
        }

    });
router.route('/update')
	.post(function(req, res) {
		SmartGoal.findById(req.body.goal_id, function(err, goal) {
			if (err)
			{
				res.status(500).send(err);
			}
			if(req.body.title)
				goal.title = req.body.title;
			if(req.body.description)
	    		goal.description = req.body.description;
			if(req.body.difficulty)
	    		goal.difficulty = req.body.difficulty;
			if(req.body.goal_type)
				goal.goal_type = req.body.goal_type;
			if(req.body.due_date)
				goal.due_date = req.body.due_date;
			if(req.body.repeat)
				goal.repeat = req.body.repeat;

			goal.user_id = res.locals.user_id;

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
	router.route('/view')
        .post(function(req, res) {
            if (req.body.goal_id) {
                SmartGoal.findById(req.body.goal_id, function(err, goal) {
                    if (err) {
                        res.status(500).send(err);
                    } else {

                      res.json(goal);
                    }
                });
            } else {
                res.sendStatus(400);
            }
        });

	updateRepeats = function(goals){
		goals.forEach(function (goal)
		{
			var thisWeek=0;
			if(goal.goal_type == "REPEAT")
			{
				goal.complete=false;

				var realDate = moment();
				//var testDate = moment().add(addWeeks, 'week');
				realDate.format();
				//testDate.format();
				var date = realDate;
				var currentWeek = moment(date).week();

				goal.completeDates.forEach(function (eachDate)
				{
					//console.log(eachDate);
					if (moment(eachDate).week() == currentWeek)
					{
						thisWeek++;
						//console.log("foundone");
					}
				});
				goal.completesThisWeek=thisWeek;
				if(goal.repeat == thisWeek || goal.repeat <thisWeek)
				{
					goal.complete=true;
				}
				else {
					goal.complete=false;
				}
				goal.save(function(err) {
					if (err)
					{
						//res.status(500).send(err.message);
					}
					else {
						//console.log(goal);
						//res.status(200).json({message: "Goal updated"});
					}
				});
			}
		});
	}
	updatePriorities = function(goals){
		goals.forEach(function (goal)
		{
			if (goal.goal_type == 'SINGLE')
			{
				var dueDate=moment(goal.due_date);
				var date = moment();
				var daysAway=dueDate.diff(date, 'days');
				console.log(goal.title+": days til due: "+daysAway);
				goal.priorityLevel=daysAway;
				if (daysAway<0)
				{
					goal.priorityLevel=-1;
					goal.overDue=true;
				}
				goal.save(function(err) {
					if (err)
					{
						//res.status(500).send(err.message);
					}
					else
					{
						//console.log(goal);
						//res.status(200).json({message: "Goal updated"});
					}
				});
			}
			else if (goal.goal_type == 'OPEN')
			{
				var date = moment();
				var dateMade = moment(goal.date_created, 'days');
				var daysAgo=date.diff(dateMade, 'days');
					if (goal.priority=="LOW")
					{
						goal.priorityLevel=(daysToMaxLow-daysAgo);
						if (goal.priorityLevel < 0)
						{
							goal.priorityLevel=0;
						}
					}
					else if (goal.priority=="MEDIUM")
					{
						goal.priorityLevel=(daysToMaxMedium-daysAgo);
						if (goal.priorityLevel < 0)
						{
							goal.priorityLevel=0;
						}
					}
					else if (goal.priority=="HIGH") //HIGH
					{
						goal.priorityLevel=(daysToMaxHigh-daysAgo);
						if (goal.priorityLevel < 0)
						{
							goal.priorityLevel=0;
						}
					}
				goal.save(function(err) {
					if (err)
					{
						//res.status(500).send(err.message);
					}
					else {
						//console.log(goal);
						//res.status(200).json({message: "Goal updated"});
					}
				});
			}
				else if (goal.goal_type == 'REPEAT')
				{
					var completesRemaining = (goal.repeat-goal.completesThisWeek);
					var date=moment();
					var dayOfWeek=date.day();
					dayOfWeek++;
					var daysLeft=(7-dayOfWeek);
					var freeDays = daysLeft-completesRemaining;
					goal.priorityLevel=freeDays*2;
					goal.save(function(err) {
						if (err)
						{
							//res.status(500).send(err.message);
						}
						else {
							//console.log(goal);
							//res.status(200).json({message: "Goal updated"});
						}
					});
				}
		});
	}


module.exports = router;
