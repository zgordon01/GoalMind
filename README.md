#SmartGoals API - Work In Progress



- [x] 1. __Route:__ ```localhost/smartgoals/goal```
* __Action:__ __GET__ request
	+ Returns all SmartGoal objects in the database.  This will be either disabled or locked down to an admin-only level for final app - we don’t want users seeing other user’s goals.  It is currently active for test purposes


----- 


- [x] 2. __Route:__ ```localhost/smartgoals/goal```
* __Action:__ __POST__ request
	+ Creates a new SmartGoal object.
	+ Required Parameters:
		- title : String
		- description : String
		- user_id : String
		- user_token : String
		- difficulty : String (“LOW”, “MEDIUM”, or “HIGH”)
		- goal_type : String (“OPEN”, “SINGLE”, “REPEAT”)
		- due_date : Date (Required if goal_type is SINGLE)
		- repeat : String (“DAILY”, “WEEKLY”, “MONTHLY”) (Required if goal_type is REPEAT)


-----


- [x] 3. __Route:__ ```localhost/smartgoals/goal/update```
* __Action:__ __POST__ request
	+ Updates an existing SmartGoal object.
	+ Required Parameters:
		- goal_id: String
 		- user_id: String
		- user_token: String
	+ Optional parameters (anything you want to update):
		- title: String
		- description: String
		- difficulty: String (“LOW”, “MEDIUM”, or “HIGH”)
		- goal_type: String (“OPEN”, “SINGLE”, “REPEAT”)
		- due_date: Date (Required if goal_type is SINGLE)
		- repeat: String (“DAILY”, “WEEKLY”, “MONTHLY”) (Required if goal_type is REPEAT)


-----


- [x] 4. __Route:__ ```localhost/smartgoals/byuser```
* __Action:__ __POST__ request
* Returns all SmartGoal objects in the database with user_id matching the given user_id.
	+ Required Parameters:
		- user_id: String
		- user_token: String


-----


- [x] 5. __Route:__ ```localhost/smartgoals/complete```
* __Action:__ __POST__ request
	+ Sets a specific SmartGoal object as complete.
	+ Required Parameters:
		- user_id: String
		- user_token: String
		- goal_id: String


-----


- [x] 6. __Route:__ ```localhost/users```
* __Action:__ __POST__ request
* Creates a user if one with user_id does not exists. Returns the user object matching by user_id.
	+ Parameters Required:
		- user_id: String
		- user_token: String

