#SmartGoals API - Work In Progress
##### testing

localhost/smartgoals/goal
Action: GET request
Returns all SmartGoal objects in the database.  This will be either disabled or locked down to an admin-only level for final app - we don’t want users seeing other user’s goals.  It is currently active for test purposes

localhost/smartgoals/goal
Action: POST request
Creates a new SmartGoal object.
Parameters required:
title - String
description - String
user_id - String
user_token - String
difficulty - String (“LOW”, “MEDIUM”, or “HIGH”)
goal_type - String (“OPEN”, “SINGLE”, “REPEAT”)
due_date - Date (Required if goal_type is SINGLE)
repeat - String (“DAILY”, “WEEKLY”, “MONTHLY”) (Required if goal_type is REPEAT)

localhost/smartgoals/goal/update
Action: POST request
Updates an existing SmartGoal object.
Parameters required:
goal_id - String
user_id - String
user_token - String
Optional Parameters (anything you want to update)
title - String
description - String
difficulty - String (“LOW”, “MEDIUM”, or “HIGH”)
goal_type - String (“OPEN”, “SINGLE”, “REPEAT”)
due_date - Date (Required if goal_type is SINGLE)
repeat - String (“DAILY”, “WEEKLY”, “MONTHLY”) (Required if goal_type is REPEAT)

localhost/smartgoals/byuser
Action: POST request
Returns all SmartGoal objects in the database with user_id matching the given user_id.
Parameters required:
user_id - String
user_token: String

localhost/smartgoals/complete
Action: POST request
Sets a specific SmartGoal object as complete.
Parameters Required:
user_id: String
user_token: String
goal_id: String

localhost/users
Action: POST
Creates a user if one with user_id does not exists. Returns the user object matching by user_id.
Parameters Required:
user_id: String
user_token: String
