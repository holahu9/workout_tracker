const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));


const db = require("./models");

// Mongoose connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )  // when connected successfully, a message will be displayed. 
  .then(() => {
    console.log("Connected to Mongo database!");
  })  // error message if failed.
  .catch(err => {
    console.error("App starting error:", err.stack);
  });


// routes
require("./routes/htmlRoutes.js")(app);  // import the html routes
require("./routes/apiRoutes.js")(app); //import the api routes




  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });