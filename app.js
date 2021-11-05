const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const $points = document.querySelector(".points");
let isJumpping = false;
let position = 0;
let points = 0;
let isGamerOver = false;
let isStarted = false;

function handleKeyUp(event) {
  event.preventDefault();
  if (event.code == "Space") {
    if (!isStarted) {
      createCactus();
      isStarted = true;
    }
    if (!isJumpping && !isGamerOver) {
      jump();
    }
  }
}

function storePoints(points) {
  console.log("oi", points);
  localStorage.setItem("rex-points", points);
}

function setPosition(position) {
  dino.style.bottom = position + "px";
}

function jump() {
  isJumpping = true;

  let up = setInterval(function () {
    if (position >= 150) {
      clearInterval(up);
      let down = setInterval(function () {
        position -= 20;
        setPosition(position);
        if (position <= 0) {
          isJumpping = false;
          clearInterval(down);
        }
      }, 20);
    } else {
      position += 20;
      setPosition(position);
    }
  }, 20);
}

function createCactus() {
  let cactusPosition = 1000;

  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);

  const random = (Math.random() * 4000) | 0;

  let timeout;
  let intervalPoints;
  let leftInterval = setInterval(function () {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      cactus.style.left = 0 + "px";
      console.log("game over");
      isGamerOver = true;
      top.location.reload();

      clearTimeout(timeout);
      clearInterval(intervalPoints);
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  intervalPoints = setInterval(function () {
    if (isGamerOver) {
      storePoints(points);
      points = 0;
      clearInterval(intervalPoints);
    } else {
      points += 1;
      $points.textContent = points;
    }
  }, 90);

  timeout = setTimeout(createCactus, random);
}

// createCactus();
document.addEventListener("keyup", handleKeyUp);
