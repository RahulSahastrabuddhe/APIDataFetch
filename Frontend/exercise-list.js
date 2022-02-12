const loadExercises = () => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "https://wger.de/api/v2/exerciseinfo/?format=json", false);
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

                        <div>Description: ${exercise.description}</div>
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
            </div>
        `;

    document.getElementById("exercises").innerHTML =
      document.getElementById("exercises").innerHTML + x;
  }
};

loadExercises();
