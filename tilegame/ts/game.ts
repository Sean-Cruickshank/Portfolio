import { toggleButtons, rollOdds, boost, randomPos } from "./utils";
import { changeColour, colourArray, selectedColour } from "./customiser";
import { generatePopup } from "./popups";
import { backgroundData } from "./data";

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

let clockSpawn = rollOdds(25);
let clockTypes = [2, 3, 5]
let clockType = clockTypes[Math.floor(Math.random() * clockTypes.length)]
let clockActive = true

const startGameButton = document.querySelector('.start-game-button');
const stopGameButton = document.querySelector('.stop-game-button');
const refreshButton = document.querySelector('.refresh-button')

const endMessageElement = document.querySelector('.end-message')

export function setValues() {
  let grid = {x: 1, y: 1}
  playerPos = randomPos();
  goalPos = randomPos();
  clockPos = randomPos();
  clockSpawn = rollOdds(25)
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

export function renderGrid() {
  let gridElementHTML = '';
  plateArray.forEach((plate) => {
    if (plate.grey) {
      gridElementHTML += plateCreator('wall')
    } else if (plate.x === playerPos.x && plate.y === playerPos.y) {
      gridElementHTML += plateCreator('player')
    } else if (plate.x === goalPos.x && plate.y === goalPos.y) {
      gridElementHTML += plateCreator('key')
    } else if ((plate.x === clockPos.x && plate.y === clockPos.y) && clockSpawn && clockActive) {
      gridElementHTML += plateCreator('clock')
    } else {
      gridElementHTML += plateCreator('floor')
    }
  })
  const gridElement = document.querySelector('.grid')
  if (gridElement) gridElement.innerHTML = gridElementHTML
  renderScores()

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    score+= 1;
    boost(1, '.score-boost')
    setValues()
    renderGrid()
    setBackground('update')
  }

  if (playerPos.x === clockPos.x && playerPos.y === clockPos.y && clockActive && clockSpawn) {
    timer += (clockType * 10)
    clockActive = false
    boost(clockType, '.timer-boost')
  }
}

function setBackground(condition: string) {
  const grid = document.querySelector('.grid')
  grid?.classList.remove('level-1', 'level-2', 'level-3', 'level-4', 'level-5')
  if (condition === 'update') {
    const level = Math.min(Math.floor(score / 5) + 1, 5)
    grid?.classList.add(`level-${level}`)
  }

  if (condition === 'reset') grid?.classList.add('level-1')
}

function plateCreator(icon: string) {
  if (icon === 'wall') {
    const level = Math.min(Math.floor(score / 5) + 1, 5)
    return `
    <div
      class="plate ${icon}"
      style="${backgroundData[level - 1][icon]};"
    ></div>`
  }

  if (icon === 'player') {
    let arrowColour = localStorage.getItem('arrow') || 'black'
    return `
      <div
        class="plate player-icon"
        style="
          background-color: ${selectedColour};
          background-image: url(/images/tilegame/player-template-${arrowColour}.png);
        "
      ></div>`
  }

  if (icon === 'key') {
    return `
      <div
        class="plate key"
        style="background-image: url(/images/tilegame/key.png);"
      ></div>
    `
  }

  if (icon === 'clock') {
    return `
      <div
        class="plate clock"
        style="background-image: url(/images/tilegame/clock-${clockType}.png);"
      ></div>`
  }
  
  return `<div class="plate ${icon}"></div>`
}

function playGame() {
  startGameButton?.classList.add('hidden');
  stopGameButton?.classList.remove('hidden');
  refreshButton?.classList.remove('hidden')
  setValues();
  renderGrid();
  setBackground('reset')
  gameActive = true
  toggleButtons('start-game', 'disable')
  const clock = setInterval(() => {
    if (timer > 0) {
      timer--;
      const timerElement = document.querySelector('.timer');
      if (timerElement) timerElement.innerHTML = `${(timer / 10).toFixed(1)}`
      endMessageElement?.classList.add('hidden')
    } else {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highscore', String(highScore))
        renderScores()
      }
      // toggleButtons('start-game', 'enable')
      startGameButton?.classList.remove('hidden');
      stopGameButton?.classList.add('hidden');
      refreshButton?.classList.add('hidden')
      endMessageElement?.classList.remove('hidden')
      generatePopup('end-message')
      score = 0
      gameActive = false
      clearInterval(clock)
      timer = 300
    }
  }, 100)
}

function renderScores() {
  const scoreElement = document.querySelector('.score');
  const highScoreElement = document.querySelector('.high-score');
  if (scoreElement) scoreElement.innerHTML = `Score: ${score}`;
  if (highScoreElement) highScoreElement.innerHTML = `High Score: ${highScore}`
}

export function resetHighScore() {
  highScore = 0;
  localStorage.setItem('highscore', String(highScore))
  const match = colourArray.find(colour => colour.hex === selectedColour)
  const colourSelect: HTMLSelectElement | null = document.querySelector('.colour-select')
  if (match && match.locked && colourSelect) {
    colourSelect.value = 'blue'
    changeColour('#3F48CC')
  }
  renderScores()
}

startGameButton?.addEventListener('click', () => playGame())
stopGameButton?.addEventListener('click', () => timer = 1)

setValues();
renderGrid();

export { gameActive, plateArray, playerPos, score, highScore }