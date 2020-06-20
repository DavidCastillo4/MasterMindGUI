function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev, e) {
  ev.dataTransfer.setData("id", e.id);
  ev.dataTransfer.setData("sourceId", e.parentNode.id);
}

function drop(ev) {
  let id = ev.dataTransfer.getData("id");
  let sourceId = ev.dataTransfer.getData("sourceId");
  let targetId = ev.target.id;  
  if (id != '' && sourceId == 'marbleBox' && targetId.charAt(0) == 'g') {    
    let guessDiv = document.getElementById(targetId);
    let guessCount = guessDiv.childNodes.length;
    if (guessCount < 4) {
      ev.preventDefault();
      let marble = document.getElementById(id).cloneNode(true);
      ev.target.appendChild(marble);
      if (guessCount == 3) {
        checkUserGuess(guessDiv, targetId)
      }
    }
  }
}

let cpuGuess = [];

let generateRandomGuess = () => {
  let i = 1
  while (i <= 4) {
    let b = 5, a = 1;
    let num = Math.random() * (b - a) + a;
    let numFloor = Math.floor(num)
    cpuGuess.push(numFloor)
    i++
  }
  console.log(cpuGuess)
}

generateRandomGuess();

let checkUserGuess = (e, targetId) => {
  let userGuess = getGuesses(e);
  let p = e.nextElementSibling;
  let positionColor = 0, color = 0;
  for (i in userGuess) {
    if (userGuess[i] == cpuGuess[i]) { positionColor += 1 }
    if (cpuGuess.some(g => g == userGuess[i])) { color += 1 }
  };
  let msg;
  if (positionColor == 4) { msg = "Winner!!!" }
  else {

    if (targetId == "g10") { msg = "Sorry! Try Again."; }
    else {
      msg = positionColor + ',' + color;
      showNextGuess(targetId)
    }
  };
  p.innerHTML = msg;
}

let showNextGuess = (id) => {
  let section = document.getElementById(id)
  let nextSection = section.parentElement.nextElementSibling
  nextSection.style.visibility = "visible"
}

let getMarbleNum = (d) => {
  return d.replace('m', '');
}

let getGuesses = (rod) => {
  let guesses = [];
  for (let i = 0; i < rod.childNodes.length; i++) {
    let child = rod.childNodes[i];
    if (child.nodeType != 3) {
      guesses.push(getMarbleNum(child.id))
    }
  }
  return guesses;
}


let newGame = () => {
  window.location.reload();
}

alert('View Console for solution')