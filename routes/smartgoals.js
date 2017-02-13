
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
		query.user_id = res.locals.user_id;

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
        if (req.body.goal_id) {
            SmartGoal.findById(req.body.goal_id, function(err, goal) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    goal.complete = true;

                    /*
                    	Code for calculating points earned
                    	Send points to user object, add points earned to JSON response
                    */

                    goal.save(function(err) {
                        if (err) {
                            res.status(500).send(err.message);
                        } else {
                            res.json({
                                message: "Goal set as complete."
                            });
                        }
                    });
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
router.route('/')

    .post(function(req, res) {
        var goal = new SmartGoal();
        if (req.body.title && req.body.goal_type) {
						if (req.body.description)
						{
							goal.description = req.body.description;
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

			goal.user_id = res.locals.user_id;

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
module.exports = router;
