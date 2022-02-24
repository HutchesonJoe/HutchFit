//adding two main buttons
function addClientButton(){
const addNewClientButton = document.getElementById("add-client");
addNewClientButton.addEventListener("click", newClientHandler);
}
addClientButton();

function getRosterButton(){
const rosterHolder = document.getElementById("roster")
const getRosterButton = document.createElement("button");
getRosterButton.id = "roster-button"
getRosterButton.textContent = "Get Roster";
getRosterButton.addEventListener("click", showRoster);
let div = document.getElementById("client-summary");
rosterHolder.insertBefore(getRosterButton, div);
}
getRosterButton();

//adding a new client to the roster
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
  nameInput.id = "name";

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

//submiting the client

function submitClient(e){
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
  }

//showing roster of current clients
function showRoster(){
  const roster = document.getElementById("roster-button");
  roster.removeEventListener("click", showRoster);
  roster.addEventListener("click", hideRoster);
  roster.textContent = "";
  roster.textContent = "Hide Roster"

  let getClients = fetch("http://localhost:3000/clients",{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
    .then(response => {return response.json()})
    .then(data => {const currentRoster = data;
      let rosterArray = Object.values(currentRoster);
      let rosterTd = document.getElementById("roster");
      let rosterDiv = document.createElement("div");
      rosterDiv.id = "roster-holder"
      for (let client of rosterArray){
        let thisClient = document.createElement("button");
        thisClient.className = "roster-button"
        thisClient.textContent = client.name;
        thisClient.id = client.id;
        thisClient.className = "roster-button"
        thisClient.addEventListener("click", clientSummary);
        
        
        rosterTd.append(rosterDiv)
        rosterDiv.append(thisClient)

      }
    });
  
} 
///hiding the roster
function hideRoster(e){
  e.target.remove();
  const roster = document.getElementById("roster-holder");
  roster.remove();
  getRosterButton();
  let clientSummary = document.getElementById("client-summary");
  console.log(clientSummary)

}

//creating a summary of each client
function clientSummary(e){
  const thisClient = e.target.textContent;
  let clientId = parseInt(e.target.id);
    fetch(`http://localhost:3000/clients`,{
      method: 'GET',
      headers:  {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {const clientArray = data;

    //remove previous client summary
    const client = clientArray.find(element => element.id === clientId);
    const rosterHolder = document.getElementById("roster-holder");
    // const summary = rosterHolder.getElementsByTagName("div");
    // console.log(summary)
    
    const name = client.name
    const age = client.age
    const height = client.height
    const weight = client.weight
    const challenges = client.challenges
    const days = client.days
    const equipment = client.equipment
    const willWorkOut = client.willWorkOut
    let willWorkOutResp = ""
      if (willWorkOut === "Yes"){
      willWorkOutResp = `${name} will work out on their own`
      } else {
      willWorkOutResp = `${name} will not work out on their own`
  
        } 
    const roster = document.getElementById("roster");

    const rosterBox = roster.getElementsByTagName("div");
    const thisClientSummary = (rosterBox[0])
    debugger
    thisClientSummary.id = name;
    thisClientSummary.className = "client-summary"
    thisClientSummary.style.color = "blue";
    thisClientSummary.style.background = "white";
    thisClientSummary.textContent = "";
    thisClientSummary.textContent = `${name} is ${age} years old, ${height} feet, ${weight} lbs. Current goals and challenges are: ${challenges}. ${name} will plan to work out ${days} days a week, with access to ${equipment}. ${willWorkOutResp}.`;
    
    //   if (summary[0].id === name){
    //     debugger
    //     thisClientSummary.remove()
    // }
    })
}