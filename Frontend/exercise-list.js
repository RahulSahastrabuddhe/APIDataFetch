const setEditModal = (uuid) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", `http://localhost:3000/exercise/${uuid}`, false);
  xhttp.send();

  const book = JSON.parse(xhttp.responseText);

  const { title, author, publisher, publish_date, numOfPages } = exercise;

  document.getElementById("uuid").value = uuid;
  document.getElementById("name").value = title;
  document.getElementById("author").value = author;
  document.getElementById("publisher").value = publisher;
  document.getElementById("publish_date").value = publish_date;
  document.getElementById("numOfPages").value = numOfPages;

  // setting up the action url for the book
  document.getElementById(
    "editForm"
  ).action = `http://localhost:3000/exercises/${uuid}`;
};

const deleteExercise = (uuid) => {
  console.log(uuid);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/exercise/${uuid}`, false);
  xhttp.send();

  location.reload();
};

const loadExercises = () => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("get", `http://localhost:3000/exercise`, false);
  xhttp.send();

  const exercises = JSON.parse(xhttp.responseText);
  console.log(exercises.results);

  for (let exercise of exercises.results) {
    const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${exercise.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted" hidden>${exercise.uuid}</h6>

                        <div class="descrp">Description: ${exercise.description}</div>
                        <div>Main Muscle: ${exercise.category?.name}</div>
                        <div>Equpment: ${exercise.equipment[0]?.name}</div>

                        <hr>

                        <button type="button" class="btn btn-danger"  onClick="deleteExercise(${exercise.uuid})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editExerciseModal" onClick="setEditModal(${exercise.uuid})">
                            Edit
                        </button>
                    </div>
                </div>
                </br>
            </div>
        `;

    document.getElementById("exercises").innerHTML =
      document.getElementById("exercises").innerHTML + x;
  }
};

loadExercises();
