import { toggleButtons, rollOdds, boost, randomPos } from "./utils";
import { setColourPicker, changeColour, colourArray, selectedColour } from "./customiser";
import { generateEndMessage } from "./popups";

type plate = {
    grey: boolean;
    x: number;
    y: number;
}

let plateArray: plate[] = [];
let playerPos = randomPos();
let goalPos = randomPos();
let clockPos = randomPos();

let score = 0
let highScore = Number(localStorage.getItem('highscore')) || 0

let gameActive = false;
let timer = 300

let clockSpawn = rollOdds(100);
let clockTypes = [2, 3, 5]
let clockType = clockTypes[Math.floor(Math.random() * clockTypes.length)]
let clockActive = true

const startGameButton = document.querySelector('.start-game-button');
const stopGameButton = document.querySelector('.stop-game-button');

const endMessageElement = document.querySelector('.end-message')

export function setValues() {
  let grid = {x: 1, y: 1}
  playerPos = randomPos();
  goalPos = randomPos();
  clockPos = randomPos();
  clockSpawn = rollOdds(100)
  clockType = clockTypes[Math.floor(Math.random() * clockTypes.length)]
  clockActive = true
  plateArray = [];

  for (let i = 0; i < 144; i++) {
    let isGrey = false;
    if (rollOdds(20)) {
      if (grid.x === playerPos.x && grid.y === playerPos.y) {
        isGrey = false;
      } else if (grid.x === goalPos.x && grid.y === goalPos.y) {
        isGrey = false;
      } else if (grid.x === clockPos.x && grid.y === clockPos.y) {
        isGrey = false;
      } else {
        isGrey = true;
      }
      
    }
    if (grid.x < 12) {
      plateArray.push({grey: isGrey, x: grid.x, y: grid.y})
      grid.x++;
    } else if (grid.x === 12) {
      plateArray.push({grey: isGrey, x: grid.x, y: grid.y})
      grid.x = 1;
      grid.y++;
    }
  }
}

function plateCreator(icon: string) {
  const level = Math.min(Math.floor(score / 5) + 1, 5)
  const arrowElement: HTMLSelectElement | null = document.querySelector('.arrow-select')
  if (icon === 'floor' || icon === 'wall') {
    return `<div class="plate ${icon}-${level}"></div>`
  }
  if (icon === 'player' && arrowElement) {
    return `<div class="plate player-icon player-icon-${arrowElement.value}" style="background-color: ${selectedColour};"></div>`
  }
  
  return `<div class="plate ${icon}"></div>`
}

export function renderGrid() {
  let gameElementHTML = '';
  plateArray.forEach((plate) => {
    if (plate.grey) {
      gameElementHTML += plateCreator('wall')
    } else if (plate.x === playerPos.x && plate.y === playerPos.y) {
      gameElementHTML += plateCreator('player')
    } else if (plate.x === goalPos.x && plate.y === goalPos.y) {
      gameElementHTML += plateCreator('key')
    } else if ((plate.x === clockPos.x && plate.y === clockPos.y) && clockSpawn && clockActive) {
      gameElementHTML += plateCreator(`clock-${clockType}`)
    } else {
      gameElementHTML += plateCreator('floor')
    }
  })
  const gameElement = document.querySelector('.game')
  if (gameElement) gameElement.innerHTML = gameElementHTML;
  renderScores()

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    score+= 1;
    boost(1, '.score-boost')
    setValues()
    renderGrid()
  }

  if (playerPos.x === clockPos.x && playerPos.y === clockPos.y && clockActive) {
    timer += (clockType * 10)
    clockActive = false
    boost(clockType, '.timer-boost')
  }
}

function playGame() {
  startGameButton?.classList.add('hidden');
  stopGameButton?.classList.remove('hidden');
  setValues();
  renderGrid();
  gameActive = true
  const clock = setInterval(() => {
    if (timer > 0) {
      timer--;
      const timerElement = document.querySelector('.timer');
      if (timerElement) timerElement.innerHTML = `${(timer / 10).toFixed(1)}`
      endMessageElement?.classList.add('hidden')
      toggleButtons('start-game', 'disable')
    } else {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highscore', String(highScore))
        renderScores()
      }
      setColourPicker()
      toggleButtons('start-game', 'enable')
      startGameButton?.classList.remove('hidden');
      stopGameButton?.classList.add('hidden');
      endMessageElement?.classList.remove('hidden')
      generateEndMessage()
      score = 0
      gameActive = false
      clearInterval(clock)
      timer = 300;
    }
  }, 100)
}

function renderScores() {
  const scoreElement = document.querySelector('.score');
  const highScoreElement = document.querySelector('.high-score');
  if (scoreElement) scoreElement.innerHTML = `Score: ${score}`;
  if (highScoreElement) highScoreElement.innerHTML = `High Score: ${highScore}`
}

function resetHighScore() {
  highScore = 0;
  localStorage.setItem('highscore', String(highScore))
  const match = colourArray.find(colour => colour.hex === selectedColour)
  const colourSelect: HTMLSelectElement | null = document.querySelector('.colour-select')
  if (match && match.locked && colourSelect) {
    colourSelect.value = 'blue'
    changeColour('#3F48CC')
  }
  renderScores()
  setColourPicker()
}

document.querySelector(".reset-score-button")?.addEventListener('click', () => resetHighScore())
startGameButton?.addEventListener('click', () => playGame())
stopGameButton?.addEventListener('click', () => timer = 1)

setColourPicker()
setValues();
renderGrid();

export { gameActive, plateArray, playerPos, score, highScore }