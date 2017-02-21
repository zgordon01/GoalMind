#SmartGoals API - Work In Progress



* __HEADERS:__ Authorization
	+ All routes are tagged with an Authorization header. This is the id_token jwt. On the backend we can use this as a session key to authorize the user.

-----

- [x] 2. __Route:__ ```localhost/smartgoals/goal```
* __Action:__ __POST__ request
	+ Creates a new SmartGoal object.
	+ Required Parameters:
		- title : String
		- priority : String (“LOW”, “MEDIUM”, or “HIGH”) (Required if goal_type is OPEN)
		- goal_type : String (“OPEN”, “SINGLE”, “REPEAT”)
		- due_date : Date (Required if goal_type is SINGLE)
		- repeat : Number (Integer) (Required if goal_type is REPEAT - This is currently how many times the user wants to accomplish the goal per week.)
	+ Optional Parameters:
		- description: String


-----


- [x] 3. __Route:__ ```localhost/smartgoals/goal/update```
* __Action:__ __POST__ request
	+ Updates an existing SmartGoal object.
	+ Required Parameters:
		- goal_id: String
	+ Optional parameters (anything you want to update):
		- title: String
		- description: String
		- priority: String (“LOW”, “MEDIUM”, or “HIGH”)
		- goal_type: String (“OPEN”, “SINGLE”, “REPEAT”)
		- due_date: Date (Required if goal_type is SINGLE)
		- repeat: Number (Integer) (Required if goal_type is REPEAT)


-----


- [x] 4. __Route:__ ```localhost/smartgoals/byuser```
* __Action:__ __POST__ request
* Returns all SmartGoal objects in the database with user_id matching the given user_id, with variable "complete" set to false
	+ Required Parameters:
		- None, User_ID is passed automatically
* Returned values:
	+ title: String,
  + description: String (If Set),
  + user_id: String,
  + priority: String (Will be set if OPEN goal),
  + goal_type: String (OPEN, SINGLE, REPEAT),
  + due_date: Date (Will be set if SINGLE goal),
  + repeat: Number (Will be set if REPEAT goal, # of requested repeats per week),
  + completeDates: [Date] (Array of Dates, one for each "complete" action. SINGLE goals should only have one. REPEAT goals may have many.)
  + completesThisWeek: Number (A pre-calculated number of complete actions for the current week. Only really applies to REPEAT goals.)
  + complete: Boolean (Yes/No value for if the goal is currently considered complete.  Complete goals will not show up on the active list.  Repeat goals will reset their complete value to false automatically when a new week starts, and re-appear on the active list)
  + date_created: Date, default: moment().format() (A Moment.js object for the current date, set automatically when created)


-----

- [x] 5. __Route:__ ```localhost/smartgoals/byuser/history```
* __Action:__ __POST__ request
* Returns all SmartGoal objects in the database with user_id matching the given user_id, with variable "complete" set to true.
	+ Required Parameters:
		- None, User_ID is passed automatically
* Returned values:
	+ title: String,
  + description: String (If Set),
  + user_id: String,
  + priority: String (Will be set if OPEN goal),
  + goal_type: String (OPEN, SINGLE, REPEAT),
  + due_date: Date (Will be set if SINGLE goal),
  + repeat: Number (Will be set if REPEAT goal, # of requested repeats per week),
  + completeDates: Date (Array of Dates, one for each "complete" action. SINGLE goals should only have one. REPEAT goals may have many.)
  + completesThisWeek: Number (A pre-calculated number of complete actions for the current week. Only really applies to REPEAT goals.)
  + complete: Boolean (Yes/No value for if the goal is currently considered complete.  Complete goals will not show up on the active list.  Repeat goals will reset their complete value to false automatically when a new week starts, and re-appear on the active list)
  + date_created: Date, default: moment().format() (A Moment.js object for the current date, set automatically when created)


-----


- [x] 6. __Route:__ ```localhost/smartgoals/complete```
* __Action:__ __POST__ request
	+ Sets a specific SmartGoal object as complete.
	+ Required Parameters:
		- goal_id: String
* Returned Values:
	+ Currently none.  To be added, we will return points earned, along with any level up or achievement info, to be used on the front end.


-----

- [x] 7. __Route:__ ```localhost/smartgoals/view```
* __Action:__ __POST__ request
	+ Returns only a single SmartGoal object, matching the given id.
	+ Required Parameters:
		- goal_id: String
* Returned values:
	+ title: String,
  + description: String (If Set),
  + user_id: String,
  + priority: String (Will be set if OPEN goal),
  + goal_type: String (OPEN, SINGLE, REPEAT),
  + due_date: Date (Will be set if SINGLE goal),
  + repeat: Number (Will be set if REPEAT goal, # of requested repeats per week),
  + completeDates: Date (Array of Dates, one for each "complete" action. SINGLE goals should only have one. REPEAT goals may have many.)
  + completesThisWeek: Number (A pre-calculated number of complete actions for the current week. Only really applies to REPEAT goals.)
  + complete: Boolean (Yes/No value for if the goal is currently considered complete.  Complete goals will not show up on the active list.  Repeat goals will reset their complete value to false automatically when a new week starts, and re-appear on the active list)
  + date_created: Date, default: moment().format() (A Moment.js object for the current date, set automatically when created)


-----

- [x] 8. __Route:__ ```localhost/smartgoals/delete/:goal_id```
* __Action:__ __DELETE__ request
	+ NOTE: The goal_id parameter is set to be hidden, meaning it does not need to be placed in the actual route, just in the body
	+ Deletes a single SmartGoal object, with the given goal_id
	+ Required Parameters:
		- goal_id: String
* Returned values:
	+ A message giving a success or error response


-----


- [x] 9. __Route:__ ```localhost/users```
* __Action:__ __POST__ request
* Creates a user if one with user_id does not exists. Also updates the user_token. Returns the user object matching by user_id.
	+ Parameters Required:
		- None


-----

- [x] 10. __Route:__ ```localhost/users/updateUser```
* __Action:__ __POST__ request
* Updates a user object with the specified parameters
	+ Optional Parameters:
		- updates: Object
			- Updates may contain the following properties:
				- Points : Number
