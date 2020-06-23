'use strict'

let cpuGuess = [];
let activeGuessDiv;
let isGameOver = 0;
let checkGuess = 0;
let guesseNum = 0

let newId = 0
let incrementNewId = () => { ++newId };


let moveMarble = (e) => {
  if (isGameOver == 0) {
    updateActiveGuessInfo();
    incrementNewId();
    let marble = document.createElement('div');
    let colorId = e.id.charAt(1)
    let color;
    if (colorId == 1) color = "red";
    if (colorId == 2) color = "blue";
    if (colorId == 3) color = "lightgreen";
    if (colorId == 4) color = "black";
    marble.style.backgroundColor = color;
    marble.setAttribute('data-colorId', colorId)
    marble.id = 'i' + newId;
    marble.classList.add('marble')
    activeGuessDiv.appendChild(marble);
    marble.setAttribute('draggable', true);
    let x = marble.getAttribute('data-colorId')     
    checkUserGuess();   
  };
};

let checkUserGuess = () => {
  let userGuess = getGuesses(); 
  let p = activeGuessDiv.nextElementSibling;
  let positionColor = 0, color = 0;
  let i;
  for (i in userGuess) {
    if (userGuess[i] == cpuGuess[i]) { positionColor += 1 }
    if (cpuGuess.some(g => g == userGuess[i])) { color += 1 }
  };
  let msg;
  if (positionColor == 4) {
    isGameOver = 1;
    msg = "Winner!!!"
  }
  else {
    if (activeGuessDiv.id == "g10" && activeGuessDiv.childNodes.length == 4) {
      isGameOver = 1;
      msg = "Sorry! Try Again.";
    }
    else {
      msg = positionColor + ',' + color;
      showNextGuess()
    }
  };
  p.innerHTML = msg;
}

let getGuesses = () => {
  let guesses = [];
  for (let i = 0; i < activeGuessDiv.childNodes.length; i++) {
    let child = activeGuessDiv.childNodes[i];
    if (child.nodeType != 3) {
      guesses.push(child.getAttribute('data-colorId'))
    }
  }  
  return guesses;
}


let showNextGuess = () => {
  if (activeGuessDiv.childNodes.length == 4) {
    let nextSection = activeGuessDiv.parentElement.nextElementSibling
    nextSection.style.visibility = "visible"
  }
}

let updateActiveGuessInfo = () => {
  for (let i = 1; i <= 10; i++) {
    let guessDiv = document.getElementById('g' + i);
    let guessCount = guessDiv.childNodes.length;
    if (guessCount <= 3) {    
      activeGuessDiv = guessDiv;
      break;
    };
  };
};

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

document.addEventListener("dragstart", function (event) {
  event.dataTransfer.setData("Text", event.target.id);  
});

document.addEventListener("dragover", function (event) {
  event.preventDefault();
});

document.addEventListener("drop", function (event) {
  event.preventDefault();
  let id = event.dataTransfer.getData("Text");
  let marble = document.getElementById(id);
  let srcId = marble.parentNode.id
  let targetId = event.target.id;

  if (srcId == targetId && activeGuessDiv.childNodes.length <= 3) {    
    event.target.appendChild(document.getElementById(id));
    checkUserGuess();
  }
});

let newGame = () => {
  window.location.reload();
};

alert('View Console for solution')

