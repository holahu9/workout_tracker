

// Dependencies
const db = require("../models");

module.exports = function(app) {
    // API route to get all workouts along with their exercises saved in the db
    app.get("/api/workouts", function(req, res) {

        db.Workout.find({})
        .populate("exercise")
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
            res.json(err);
        });
     });

     // API route to get the last 7 workouts 
    app.get("/api/workouts/range", function(req, res) {

        db.Workout.find({}).sort({$natural: -1}).limit(7)
        .populate("exercise")
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
            res.json(err);
        });
     });

    // API route to get all exercises saved in the db
    app.get("/api/exercise", function(req, res) {

       db.Exercise.find({})
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });

     //API route to post new exercise to workout. 
    app.put("/api/workouts/:id", function(req, res) {
        console.log(req.body);
        console.log(db.Exercise);
        const workoutId = req.params.id;

        db.Exercise.create(req.body)
        
        .then((results) =>
        {console.log(results)
          return  db.Workout.findOneAndUpdate({_id: workoutId}, { $push: { exercise: results._id }}, { new : true })
        }).then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
            res.json(err);
        });
    });

    // API route to create a new workout
    app.post("/api/workouts", function(req, res) {

        db.Workout.create({})
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
        res.status(400).json(err);
        });

    });

  };