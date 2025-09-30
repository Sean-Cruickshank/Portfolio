let plateArray = [];
let grid = {x: 1, y: 1}
let playerPos = randomPos();
let goalPos = randomPos();
let clockPos = randomPos();
let score = 0
let highScore = localStorage.getItem('highscore') | 0;
let selectedColour = localStorage.getItem('colour') || 'blue'
let customColour = localStorage.getItem('custom-colour') || 'white'

let clockSpawn = rollOdds(100);
let clockTypes = [2, 3, 5]
let clockType = clockTypes[Math.floor(Math.random() * clockTypes.length)]
let clockActive = true

function rollOdds(num) {
  const ran = ((Math.random().toFixed(2)) * 100)
  return ran <= num
}

function boost(val, element) {
  const boost = document.querySelector(element)
  boost.innerHTML = `<p>+${val}</p>`
  boost.classList.add('boost-active')
  setTimeout(() => {
    boost.classList.remove('boost-active')
    boost.innerHTML = `<p></p>`
  }, 500)
}

function randomPos() {
  let x = Math.ceil(Math.random() * 12);
  let y = Math.ceil(Math.random() * 12);
  return {x, y}
}

function setValues() {
  grid.x = 1;
  grid.y = 1;
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

function plateCreator(icon) {
  const level = Math.min(Math.floor(score / 5) + 1, 5)
  if (icon === 'floor' || icon === 'wall') {
    return `<div class="plate ${icon}-${level}"></div>`
  }
  if (icon === 'player') {
    return `<div class="plate player-icon player-icon-${arrowElement.value}" style="background-color: ${selectedColour};"></div>`
  }
  
  return `<div class="plate ${icon}"></div>`
}

const gameElement = document.querySelector('.game');
const selectElement = document.querySelector('.colour-select');
const colourElement = document.querySelector('.colour-input')
const arrowElement = document.querySelector('.arrow-select')

const customiserButton = document.querySelector('.customiser-button')
const customiserPanel = document.querySelector('.customiser-panel')
const customiserClose = document.querySelector('.customiser-close')

function renderCustomiserButton() {
  customiserButton.innerHTML = `
    <div
      class="player-icon player-icon-${arrowElement.value}"
      style="background-color: ${selectedColour}; height: 100%;"
      title="Customisation Settings"
    ></div>
  `
}

renderCustomiserButton()

customiserButton.addEventListener('click', () => {
  customiserPanel.classList.remove('hidden')
  toggleButtons('disable', ['highscore', 'start', 'about'])
})

customiserClose.addEventListener('click', () => {
  customiserPanel.classList.add('hidden')
  toggleButtons('enable', ['highscore', 'start', 'about'])
})

function renderGrid() {
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
  gameElement.innerHTML = gameElementHTML;
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

function renderScores() {
  const scoreElement = document.querySelector('.score');
  const highScoreElement = document.querySelector('.high-score');
  scoreElement.innerHTML = `Score: ${score}`;
  highScoreElement.innerHTML = `High Score: ${highScore}`
}

setValues();
renderGrid();

let gameActive = false;
let timer = 300

const endMessageElement = document.querySelector('.end-message')

const resetHighScoreButton = document.querySelector(".reset-score-button");
const startGameButton = document.querySelector('.start-game-button');
const stopGameButton = document.querySelector('.stop-game-button');

function toggleButtons(status, list) {
  if (status === 'enable') {
    if (list.includes('start')) {
      startGameButton.disabled = false
      startGameButton.classList.remove('button-disabled')
    }
    if (list.includes('highscore')) {
      resetHighScoreButton.disabled = false
      resetHighScoreButton.classList.remove('button-disabled')
    }
    if (list.includes('customiser')) {
      customiserButton.disabled = false
    }
    if (list.includes('about')) {
      aboutButton.disabled = false
    }
  } else if (status === 'disable') {
    if (list.includes('start')) {
      startGameButton.disabled = true
      startGameButton.classList.add('button-disabled')
    }
    if (list.includes('highscore')) {
      resetHighScoreButton.disabled = true
      resetHighScoreButton.classList.add('button-disabled')
    }
    if (list.includes('customiser')) {
      customiserButton.disabled = true
    }
    if (list.includes('about')) {
      aboutButton.disabled = true
    }
  }
}

function playGame() {
  startGameButton.classList.add('hidden');
  stopGameButton.classList.remove('hidden');
  setValues();
  renderGrid();
  gameActive = true
  const clock = setInterval(() => {
    if (timer > 0) {
      timer--;
      const timerElement = document.querySelector('.timer');
      timerElement.innerHTML = `${(timer / 10).toFixed(1)}`
      endMessageElement.classList.add('hidden')
      toggleButtons('disable', ['highscore', 'customiser'])
    } else {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highscore', highScore)
        renderScores()
      }
      setColourPicker()
      toggleButtons('enable', ['highscore', 'customiser'])
      startGameButton.classList.remove('hidden');
      stopGameButton.classList.add('hidden');
      endMessageElement.classList.remove('hidden')
      generateEndMessage()
      score = 0
      gameActive = false
      clearInterval(clock)
      timer = 300;
    }
  }, 100)
}

function killTimer() {
  timer = 1;
}

function generateEndMessage() {
  let endMessage = '';
  if (score === highScore) {
    endMessage = 'Well done, that\'s an impressive score!'
  } else if (highScore - score < 3) {
    endMessage = 'So close! You almost made it!'
  } else if (highScore - score >= 3) {
    endMessage = 'Better luck next time!'
  }

  endMessageElement.innerHTML =
    `
      <div>
        <h2>Game over!</h2>
        <p class="end-message-message">${endMessage}</p>
        <p
          class="end-message-score"
        >Your score: ${score}</p>
        <p
          class="end-message-score"
        >High score: ${highScore}</p>
        <button
          class="tg-button"
          onclick="document.querySelector('.end-message').classList.add('hidden')"
        >Close</button>
      </div>
    `
}


function closeEndMessage() {
  endMessageElement.classList.add('hidden')
}

function resetHighScore() {
  highScore = 0;
  localStorage.setItem('highscore', highScore)
  const match = colourArray.find(colour => colour.hex === selectedColour)
  if (match.locked) {
    selectElement.value = 'blue'
    changeColour('#3F48CC')
  }
  renderScores()
  setColourPicker()
}

function movePos(direction) {
  if (playerPos.x > 1 && direction === 'ArrowLeft') {
    if (checkPos(direction)) {
      playerPos.x --;
      renderGrid()
    }
  } else if (playerPos.x < 12 && direction === 'ArrowRight') {
    if (checkPos(direction)) {
      playerPos.x ++;
      renderGrid()
    }
  } else if (playerPos.y > 1 && direction === 'ArrowUp') {
    if (checkPos('ArrowUp')) {
      playerPos.y--
      renderGrid()
    }
  } else if (playerPos.y < 12 && direction === 'ArrowDown') {
    if (checkPos('ArrowDown')) {
      playerPos.y++
      renderGrid()
    }
  }
}

addEventListener('keydown', (input) => {
  if (gameActive) {
    movePos(input.key);
    if (input.key === 'Enter') {
      setValues();
      renderGrid();
    }
  }
})

function checkPos(move) {
  let result = true;
  plateArray.forEach((plate) => {
    if (move === 'ArrowLeft' && plate.x === playerPos.x - 1 && plate.y === playerPos.y) {
      if (plate.grey) result = false
    } else if (move === 'ArrowRight' && plate.x === playerPos.x + 1 && plate.y === playerPos.y) {
      if (plate.grey) result = false
    } else if (move === 'ArrowUp' && plate.x === playerPos.x && plate.y === playerPos.y - 1) {
      if (plate.grey) result = false
    } else if (move === 'ArrowDown' && plate.x === playerPos.x && plate.y === playerPos.y + 1) {
      if (plate.grey) result = false
    }
  })
  return result
}

const colourArray = [
  {name: 'Blue', hex: '#3F48CC', locked: false, required: 0},
  {name: 'Red', hex: '#ED1C24', locked: false, required: 0},
  {name: 'Yellow', hex: '#FFF200', locked: false, required: 0},
  {name: 'Green', hex: '#22B14C', locked: false, required: 0},
  {name: 'Teal', hex:'#21A7B1', locked: true, required: 10},
  {name: 'Orange', hex: '#FF7F27', locked: true, required: 15},
  {name: 'Custom', hex: '#FFFFFF', locked: true, required: 20},
]
let isCustomSelected = false

function customCheck() {
  const match = colourArray.find(colour => colour.hex === selectedColour)
  isCustomSelected = !match
}

function changeColour(colour) {
  selectedColour = colour
  localStorage.setItem('colour', colour)
  renderCustomiserButton()
}

selectElement.addEventListener('input', () => {
  if (selectElement.value === '#FFFFFF') {
    changeColour(customColour)
    colourElement.click()
  } else {
    changeColour(selectElement.value)
  }
})

colourElement.addEventListener('input', () => {
  changeColour(colourElement.value)
  customColour = colourElement.value
  localStorage.setItem('custom-colour', customColour)
})

arrowElement.addEventListener('input', () => {
  renderCustomiserButton()
})

function setColourPicker() {
  let optionHTML = ''
  customCheck()
  colourArray.forEach(option => {
    optionHTML+= `
      <option
        value="${option.hex}"
        title="${option.name}"
        ${option.hex === selectedColour || option.hex === '#FFFFFF' & isCustomSelected ? 'selected="true"' : ''}
        ${highScore < option.required ? 'disabled="true"' : ''}
      >${highScore < option.required ? `${option.name} (required score: ${option.required})` : option.name}</option>
    `
  })
  selectElement.innerHTML = `
    <select class="colour-select colour-select" name="colour" id="colour-select">
      ${optionHTML}
    </select>
  `
}

setColourPicker()

resetHighScoreButton.addEventListener('click', () => {
  resetHighScore()
})

startGameButton.addEventListener('click', () => {
  playGame()
})

stopGameButton.addEventListener('click', () => {
  killTimer()
})

const aboutButton = document.querySelector('.about-button')
const aboutPanel = document.querySelector('.about-panel')
const aboutClose = document.querySelector('.about-close')

aboutButton.addEventListener('click', () => {
  aboutPanel.classList.remove('hidden')
  toggleButtons('disable', ['highscore', 'start', 'customiser'])
})

aboutClose.addEventListener('click', () => {
  aboutPanel.classList.add('hidden')
  toggleButtons('enable', ['highscore', 'start', 'customiser'])
})