import { shuffle } from "./utils.js";
let gameArea;
let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let openCard;
let clickable = true;
let numberOfClicks = 0;
let winCount = 0;

window.addEventListener("load", main);

function main() {
  removeEventListener("load", main);
  gameArea = document.querySelector("#game-area");
  createGameArea();
  gameArea.addEventListener("click", cardClick);
}

function cardClick(event) {
  const TARGET = event.target;
  if (TARGET.tagName.toLowerCase() !== "img" || !clickable) return;
  TARGET.classList.remove("hidden");
  if (openCard === undefined) {
    openCard = TARGET;
  } else if (openCard.src !== TARGET.src) {
    clickable = false;
    numberOfClicks++;
    setTimeout(function () {
      TARGET.classList.add("hidden");
      openCard.classList.add("hidden");
      openCard = undefined;
      clickable = true;
    }, 800);
  } else {
    openCard = undefined;
    numberOfClicks++;
    winCount++;
  }
  addNumberOfClicks();
  winMassage();
}

function createGameArea() {
  cards = cards.concat(cards);
  cards = shuffle(cards);
  for (let index = 0; index < cards.length; index++) {
    const CARD_NBR = cards[index];
    let div = document.createElement("div");
    div.classList.add("card");
    div.id = CARD_NBR;
    let img = document.createElement("img");
    img.classList.add("hidden");
    img.setAttribute("src", `assets/img/nature${CARD_NBR}.jpg`);
    div.appendChild(img);
    gameArea.appendChild(div);
  }
}

function addNumberOfClicks() {
  document.getElementById(
    "number"
  ).innerHTML = `Number of Tries: ${numberOfClicks}`;
}

function winMassage() {
  if (winCount >= 10) {
    document.getElementById("number").style.color = "green";
    document.getElementById(
      "number"
    ).innerHTML = `Congrats You Made It At ${numberOfClicks} Number of tries!!`;
    playAgain();
  }
}

function playAgain() {
  let div = document.getElementById("playAgainButton");
  let button = document.createElement("BUTTON");
  let text = document.createTextNode("Play Again");
  button.appendChild(text);
  div.appendChild(button);
  button.addEventListener("click", restart);
}

function restart() {
  window.location.reload();
}
