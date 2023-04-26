const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const resetButton = document.querySelector(".reset-btn");

// intially score is zero
let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

//reset btn
resetButton.addEventListener("click", () => {
  reset();
});

//resetfunction

function reset() {
  score.textContent = 0;
  currentTime = 60;
  result = 0;
  clearInterval(countDownTimerId);
  clearInterval(timerId);
  start();
}

//for random sqaures to display the image
function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition) {
      square.classList.add("hit-mole");
      setTimeout(() => {
        square.classList.remove("hit-mole");
      }, 300);
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

// moving the image in randomsquare
function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    timeLeft.textContent = "0";
    hitPosition = null;
  }
}
function start() {
  moveMole();
  randomSquare();
  countDownTimerId = setInterval(countDown, 1000);
}

start();
