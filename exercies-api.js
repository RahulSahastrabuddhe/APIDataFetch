const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var request = require("request");
const port = 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let exercises = [];

app.get("/exercise", (req, res) => {
  console.log(exercises);
  var url = "https://wger.de/api/v2/exerciseinfo/?format=json";
  var temp = req.pipe(request(url)).pipe((exercises = res));
  exercises = temp.result;
});

app.get("/exercise/:uuid", (req, res) => {
  // reading uuid from the URL
  const uuid = req.params.uuid;

  // searching books for the uuid
  for (let exercise of exercises) {
    if (exercise.uuid === uuid) {
      res.json(exercise.results);
      return;
    }
  }

  // sending 404 when not found
  res.status(404).send("uuid not found");
});

app.delete("/exercise/:uuid", (req, res) => {
  // reading uuid from the URL
  const uuid = req.params.uuid;
  console.log(uuid);
  console.log(exercises);
  // remove item from the exercise array
  exercise = exercises.filter((i) => {
    if (i.uuid !== uuid) {
      return true;
    }

    return false;
  });

  // sending 404 when not found
  res.send("exercise is deleted");
});

app.post("/exercise/:uuid", (req, res) => {
  // reading uuid from the URL
  const uuid = req.params.uuid;
  const newExercise = req.body;

  // remove item from the books array
  for (let i = 0; i < exercises.length; i++) {
    let exercise = exercises[i];

    if (exercise.uuid === uuid) {
      exercises[i] = newExercise;
    }
  }

  // sending 404 when not found
  res.send("exercise is edited");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
