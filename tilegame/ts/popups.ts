import { toggleButtons } from "./utils";
import { score, highScore } from "./game";

const popupData = [
  {
    mode: 'settings',
    content: `
      <button class="reset-score-button">Reset Highscore</button>
      <button class="toggle-touchpad">Toggle Touchpad</button>
    `
  }, {
    mode: 'about',
    content: `
      <h2>How to Play!</h2>
      <p>The goal of the game is to collect as many keys as you can before the timer ends</p>
      <div class="plate key about-dummy"></div>

      <p>Reaching higher scores allows you to unlock new backgrounds and customisation options</p>

      <p>Collect timers to extend the length of a match and score more points</p>
      <div class="about-clocks">
        <div class="plate clock-2 about-dummy"></div>
        <div class="plate clock-3 about-dummy"></div>
        <div class="plate clock-5 about-dummy"></div>
      </div>

      <p>Each level is randomly generated, so you may sometimes encounter a level where the key is inaccessible</p>
      <p>Reset the board at any time by hitting the 'Enter' key or by pressing the reset button!</p>
    `
  }, {
    mode: 'customiser',
    content: `
      <h2>Customisation Settings</h2>
      <div class="customiser-option">
        <p>Colour:</p>
        <select class="colour-select" name="colour" id="colour-select">
          <option title="Blue" value="blue">Blue</option>
          <option title="Red" value="red">Red</option>
          <option title="Yellow" value="yellow">Yellow</option>
          <option title="Green" value="green">Green</option>
          <option title="Teal" value="teal">Teal</option>
          <option title="Orange" value="orange">Orange</option>
          <option title="Custom" value="custom">Custom</option>
        </select>
      </div>

      <div class="customiser-option">
        <p>Frame:</p>
        <select class="arrow-select" name="arrow" id="arrow-select">
          <option title="Black" value="black">Black</option>
          <option title="White" value="white">White</option>
          <option title="Gold" value="gold">Gold</option>
        </select>
      </div>
      <input class="colour-input" type="color" />
    `
  }
]

// function togglePopup(popup: string) {
//     const button = document.querySelector(`.${popup}-button`)
//     const panel = document.querySelector(`.${popup}-panel`)
//     const close = document.querySelector(`.${popup}-close`)

//     button?.addEventListener('click', () => {
//     panel?.classList.remove('hidden')
//     toggleButtons(popup, 'disable')
//     })

//     close?.addEventListener('click', () => {
//     panel?.classList.add('hidden')
//     toggleButtons(popup, 'enable')
//     }) 
// }

// const popups = ['about', 'settings', 'customiser']
// popups.forEach(popup => togglePopup(popup))

export function generateEndMessage() {
  const endMessageElement = document.querySelector('.end-message')
  let endMessage = '';
  if (score === highScore) {
    endMessage = 'Well done, that\'s an impressive score!'
  } else if (highScore - score < 3) {
    endMessage = 'So close! You almost made it!'
  } else if (highScore - score >= 3) {
    endMessage = 'Better luck next time!'
  }

  if (endMessageElement) endMessageElement.innerHTML =
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

const popupElement = document.querySelector('.popup-generic')

function generatePopup(mode: string) {
  const contentElement = document.querySelector('.popup-content')
  popupElement?.classList.remove('hidden')
  const data = popupData.find(popup => popup.mode === mode)
  if (contentElement && data) contentElement.innerHTML = `
    ${data.content}
    <button class="popup-close">Close</button>
  `
  toggleButtons(mode, 'disable')
  contentElement?.querySelector('.popup-close')?.addEventListener('click', () => closePopup(mode))
}

function closePopup(mode: string) {
  popupElement?.classList.add('hidden')
  toggleButtons(mode, 'enable')
}

document.querySelector('.settings-button')?.addEventListener('click', () => generatePopup('settings'))
document.querySelector('.about-button')?.addEventListener('click', () => generatePopup('about'))
document.querySelector('.customiser-button')?.addEventListener('click', () => generatePopup('customiser'))