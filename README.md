#SmartGoals API - Work In Progress



* __HEADERS:__ Authorization
	+ All routes are tagged with an Authorization header. This is the id_token jwt. On the backend we can use this as a session key to authorize the user.

-----

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
		- None


-----


- [x] 5. __Route:__ ```localhost/smartgoals/complete```
* __Action:__ __POST__ request
	+ Sets a specific SmartGoal object as complete.
	+ Required Parameters:
		- goal_id: String


-----


- [x] 6. __Route:__ ```localhost/users```
* __Action:__ __POST__ request
* Creates a user if one with user_id does not exists. Also updates the user_token. Returns the user object matching by user_id.
	+ Parameters Required:
		- None


-----

- [x] 7. __Route:__ ```localhost/users/updateUser```
* __Action:__ __POST__ request
* Updates a user object with the specified parameters
	+ Optional Parameters:
		- updates: Object
			- Updates may contain the following properties:
				- Points : Number
