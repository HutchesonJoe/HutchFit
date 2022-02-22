//adding a new client to the roster
let addNewClientButton = document.getElementById("add-client");
addNewClientButton.addEventListener("click", newClientHandler);

let createWorkoutButton = document.getElementById("create-workout");
createWorkoutButton.addEventListener("click", showRoster)

function newClientHandler(){
  let button = document.getElementById("add-client");
  button.remove()
  let formWindow = document.getElementById("new-client-form");
  let newForm = document.createElement("form");
  newForm.id = "new-form"
  let nameInput = document.createElement("input");
  let nameInputLabel = document.createElement("label");
  nameInputLabel.textContent = "Name"
  nameInputLabel.for = "name"
  nameInput.placeholder = "Client Name"
  nameInput.id = "name"
  let heightInput = document.createElement("input");
  let heightInputLabel = document.createElement("label");
  heightInputLabel.textContent = "Height"
  heightInput.id = "height";
  heightInputLabel.for = "height";
  heightInput.placeholder = "Height in feet (example: 6.2)";
  let weightInput = document.createElement("input");
  let weightInputLabel = document.createElement("label");
  weightInputLabel.textContent = "Weight";
  weightInput.id = "weight";
  weightInputLabel.for = "weight";
  weightInput.placeholder = "Weight in lbs (example: 182.4)";
  let ageInput = document.createElement("input");
  let ageInputLabel = document.createElement("label");
  ageInput.id = "age";
  ageInputLabel.for = "age";
  ageInputLabel.textContent = "Age";
  ageInput.placeholder = "Age";
  let challengesInput = document.createElement("textarea");
  let challengesInputLabel = document.createElement("label");
  challengesInputLabel.textContent = "Client-specific Challenges/Goals";
  challengesInput.id = "challenges";
  challengesInputLabel.for = "challenges";
  challengesInput.placeholder = "i.e. weak/tight hips, wants a bigger chest,lower back issues, underactive glutes, etc.";
  let daysInput = document.createElement("input");
  let daysInputLabel = document.createElement("label")
  daysInput.id = "days";
  daysInputLabel.for = "days";
  daysInput.placeholder = "Days";
  daysInputLabel.textContent = "How many days will this client work out?";
  let willWorkOutInput = document.createElement("select");
  let willWorkOutYes = document.createElement("option");
  willWorkOutYes.textContent = "Yes";
  let willWorkOutNo = document.createElement("option")
  willWorkOutNo.textContent = "No"
  let willWorkOutInputLabel= document.createElement("label");
  willWorkOutInput.name = "will-work-out";
  willWorkOutInputLabel.name = "will-work-out";
  willWorkOutInput.id = "will-work-out";
  willWorkOutInputLabel.for = "will-work-out"
  willWorkOutInputLabel.textContent = "Will this client work out on their own?";
  let equipmentInput = document.createElement("select");
  let equipmentInputLabel = document.createElement("label");
  equipmentInputLabel.textContent = "Available Equipment";
  equipmentInput.id = "equipment";
  equipmentInputLabel.for = "equipment"
  let equipmentOptionChoice1 = document.createElement("option");
  let equipmentOptionChoice2 = document.createElement("option");
  let equipmentOptionChoice3 = document.createElement("option");
  equipmentOptionChoice1.textContent = "Full Gym";
  equipmentOptionChoice2.textContent = "Home gym/light equipment";
  equipmentOptionChoice3.textContent = "Bodyweight/bands";
  let submit = document.createElement("input");
  newForm.addEventListener("submit", submitClient)
  submit.type = "submit"
  submit.textContent = "Submit Client to Roster"


  formWindow.append(newForm);
  newForm.append(nameInputLabel)
  newForm.append(nameInput);
  newForm.append(heightInputLabel)
  newForm.append(heightInput);
  newForm.append(weightInputLabel)
  newForm.append(weightInput);
  newForm.append(ageInputLabel);
  newForm.append(ageInput);
  newForm.append(challengesInputLabel)
  newForm.append(challengesInput);
  newForm.append(daysInputLabel)
  newForm.append(daysInput);
  newForm.append(willWorkOutInputLabel);
  newForm.append(willWorkOutInput);
  willWorkOutInput.append(willWorkOutYes);
  willWorkOutInput.append(willWorkOutNo)
  newForm.append(equipmentInputLabel);
  newForm.append(equipmentInput);
  equipmentInput.append(equipmentOptionChoice1);
  equipmentInput.append(equipmentOptionChoice2);
  equipmentInput.append(equipmentOptionChoice3);
  newForm.append(submit)



}

function showRoster(){
  clientNames = []
  let getClients = fetch("http://localhost:3000/clients",{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
    .then(response => {return response.json()})
    .then(data => {const currentRoster = data;
      debugger
      let rosterArray = Object.values(currentRoster);
      debugger
      let rosterTd = document.getElementById("create-workout-roster");
      let roster = document.createElement("ul");
      for (let client of rosterArray){
        let thisClient = document.createElement("li");
        thisClient.textContent = client.name;
        thisClient.id = client.name;
        thisClient.className = "roster"
        thisClient.addEventListener("click", createWorkout);
        
        roster.id = "roster"
        rosterTd.append(roster)
        roster.append(thisClient)

      }
    });
  
 const newForm = document.getElementById("new-form");
//  if (newForm === newForm){
//  newForm.remove()};
} 

function submitClient(e){
  //remove this later
  e.preventDefault()
  const name = e.target[0].value
  const rawHeight = e.target[1].value
  const height = parseInt(rawHeight)
  const rawWeight = e.target[2].value
  const weight = parseInt(rawWeight)
  const age = e.target[3].value
  const challengeGoals = e.target[4].value
  const daysPerWeek = e.target[5].value
  const workOutOnOwn = e.target[6].value
  const availEquip  = e.target[7].value
  
  fetch('http://localhost:3000/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "name" : name,
      //"id" : 4,
      "height" : height,
      "weight" : weight,
      "age" : age,
      "challenges" : challengeGoals,
      "days" : daysPerWeek,
      "willWorkOut" : workOutOnOwn,
      "equipment" : availEquip
      })
        
    })
        // .then(response => {return response.json()})
    // .then(data => {console.log("submited")})

  }
  


function createWorkout(e){
  let getInfo = fetch(`http://localhost:3000/clients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
    .then(response => {return response.json()})
    .then(data => {const currentRoster = Object.values(data[0]);
      
      for (const client of currentRoster){
        if (client.name === e.target.id){
          createClientCard(client)
        }
      }
    
    })
}

function createClientCard(thisClient){
  document.getElementById("create-workout").remove();
  console.log(thisClient)
  const name = thisClient.name
  const age = thisClient.age
  const height = thisClient.height
  const weight = thisClient.weight
  const challenges = thisClient.challenges
  const days = thisClient.days
  const equipment = thisClient.equipment
  const willWorkOut = thisClient.willWorkOut
    if (willWorkOut === true){
    let willWorkOutResp = `${name} will work out on their own.`
    } else {
      let willWorkOutResp = `${name} will not work out on their own.`

      } 
  
  let createWorkoutTd = document.getElementById("create-workout-roster");
  let roster = document.getElementById("roster");
  console.log(roster, "roster")
  let newClient = document.getElementById("new-client-form");
  newClient.remove();
  roster.remove();
  let clientCard = document.createElement("table");
  clientCard.class = "client-card"
  let clientSummary = document.createElement("th")
  clientCard.id = name
  clientSummary.style.color = "white";
  clientCard.style.padding = "10px"
  clientSummary.textContent = `${name} is ${age} years old, ${height} feet, ${weight} lbs. Current goals and challenges are: ${challenges}. ${name} will plan to work out ${days} days a week, with access to ${equipment}.`
  createWorkoutTd.append(clientCard);
  clientCard.append(clientSummary)
  let homeBox = document.getElementById("home-box");
  ///Block one of the workout: the same for every client
  let workoutBlockOneHolder = document.createElement("tr");
  let workoutBlockOne = document.createElement("td")
  workoutBlockOneHolder.id = "movement-prep";
  workoutBlockOne.textContent = "Copy with general content; write out my movement prep; create a checklist."
  clientCard.append(workoutBlockOneHolder);
  workoutBlockOneHolder.append(workoutBlockOne)
  ///Block two of the workout; cardio push
  let workoutBlockTwoHolder = document.createElement("tr");
  let workoutBlockTwo = document.createElement("td");
  workoutBlockTwo.id = "cardio-one";
  workoutBlockTwo.textContent = "CARDIO PUSH: Choose three of the following, perform for 30 seconds each (10 second rest), three times through. Effort level: moderate.";
  clientCard.append(workoutBlockTwoHolder);
  workoutBlockTwoHolder.append(workoutBlockTwo)
  let chooseActivity = document.createElement("div");
  chooseActivityClass = "choose-activity";
  chooseActivityId = "choose-activity-1";
  //adding cardio move
  const cardioRun = document.createElement("input");
  const cardioRunLabel = document.createElement("label");
  cardioRun.id = "run"
  cardioRunLabel.for = "run"
  cardioRun.type = "checkbox"
  cardioRun.value = "run"
  cardioRunLabel.textContent = "High knee Run in Place"
  workoutBlockTwo.append(chooseActivity)
  chooseActivity.append(cardioRun)
  chooseActivity.append(cardioRunLabel)
  //adding cardio move
  const cardioJumpingJacks = document.createElement("input");
  const cardioJJLabel = document.createElement("label");
  cardioJumpingJacks.id = "jumpingjacks"
  cardioJJLabel.for = "jumpingjacks"
  cardioJumpingJacks.type = "checkbox"
  cardioJumpingJacks.value = "jumpingjacks"
  cardioJJLabel.textContent = "Jumping Jacks"
  workoutBlockTwo.append(chooseActivity)  
  chooseActivity.append(cardioJumpingJacks)
  chooseActivity.append(cardioJJLabel)
  //adding cardio move
  const cardioWalkouts = document.createElement("input");
  const cardioWOLabel = document.createElement("label");
  cardioWalkouts.id = "walkouts"
  cardioWOLabel.for = "walkouts"
  cardioWalkouts.type = "checkbox"
  cardioWalkouts.value = "walkouts"
  cardioWOLabel.textContent = "Walkouts"
  workoutBlockTwo.append(chooseActivity)
  chooseActivity.append(cardioWalkouts)
  chooseActivity.append(cardioWOLabel)
  //adding cardio move
  const cardioSkaters = document.createElement("input");
  const cardioSkatersLabel = document.createElement("label");
  cardioSkaters.id = "skaters"
  cardioSkatersLabel.for = "skaters"
  cardioSkaters.type = "checkbox"
  cardioSkaters.value = "skaters"
  cardioSkatersLabel.textContent = "Skaters"
  workoutBlockTwo.append(chooseActivity)
  chooseActivity.append(cardioSkaters)
  chooseActivity.append(cardioSkatersLabel)
   //adding cardio move
  const lateralHops = document.createElement("input");
   const cardioLatHopsLabel = document.createElement("label");
   lateralHops.id = "lateral-hops"
   cardioLatHopsLabel.for = "lateral-hops"
   lateralHops.type = "checkbox"
   lateralHops.value = "lateral-hops"
   cardioLatHopsLabel.textContent = "Lateral Hops"
   workoutBlockTwo.append(chooseActivity)
   chooseActivity.append(lateralHops)
   chooseActivity.append(cardioLatHopsLabel)
    //adding cardio move
  const cardioClimbers = document.createElement("input");
  const cardioClimbersLabel = document.createElement("label");
  cardioClimbers.id = "climbers"
  cardioClimbersLabel.for = "climbers"
  cardioClimbers.type = "checkbox"
  cardioClimbers.value = "climbrers"
  cardioClimbersLabel.textContent = "Climbers"
  workoutBlockTwo.append(chooseActivity)
  chooseActivity.append(cardioClimbers)
  chooseActivity.append(cardioClimbersLabel)
 

  
  console.log(thisClient)
}