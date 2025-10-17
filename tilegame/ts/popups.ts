import { toggleButtons } from "./utils";
import { score, highScore, resetHighScore } from "./game";
import { selectElementOnInput, colourElementOnInput, arrowElementOnInput, setColourSelect, setArrowSelect } from "./customiser";
import { toggleTouchpad } from "./controls";
import { aboutData, popupData } from "./data";

let aboutPage = 0

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
const contentElement = document.querySelector('.popup-content')

function generatePopup(mode: string) {
  popupElement?.classList.remove('hidden')
  const data = popupData.find(popup => popup.mode === mode)
  if (contentElement && data) contentElement.innerHTML = `
    ${data.content}
    <button class="popup-close">Close</button>
  `
  toggleButtons(mode, 'disable')
  contentElement?.querySelector('.popup-close')?.addEventListener('click', () => closePopup(mode))

  if (mode === 'customiser') {
    contentElement?.querySelector('.colour-select')?.addEventListener('input', () => selectElementOnInput())
    contentElement?.querySelector('.colour-input')?.addEventListener('input', () => colourElementOnInput())
    contentElement?.querySelector('.arrow-select')?.addEventListener('input', () => arrowElementOnInput())
    setColourSelect()
    setArrowSelect()
  }

  if (mode === 'settings') {
    contentElement?.querySelector(".reset-score-button")?.addEventListener('click', () => resetHighScore())
    toggleTouchpad()
  }

  if (mode === 'about') {
    contentElement?.querySelector('.about-section-left')?.addEventListener('click', () => changeAboutPage('-'))
    contentElement?.querySelector('.about-section-right')?.addEventListener('click', () => changeAboutPage('+'))
    renderAboutContent()
  }
}

function changeAboutPage(val: string) {
  if (val === '+') aboutPage < aboutData.length - 1 ? aboutPage++ : aboutPage = 0
  if (val === '-') aboutPage > 0 ? aboutPage-- : aboutPage = aboutData.length - 1
  renderAboutContent()
}

function renderAboutContent() {
  const aboutContent = document.querySelector('.about-content')
  if (aboutContent) aboutContent.innerHTML = `
    ${aboutData[aboutPage]}
    <p class="about-page-count">${aboutPage + 1}/${aboutData.length}</p>
  `
}

function closePopup(mode: string) {
  popupElement?.classList.add('hidden')
  toggleButtons(mode, 'enable')
  if (contentElement) contentElement.innerHTML = ''
}

document.querySelector('.settings-button')?.addEventListener('click', () => generatePopup('settings'))
document.querySelector('.about-button')?.addEventListener('click', () => generatePopup('about'))
document.querySelector('.customiser-button')?.addEventListener('click', () => generatePopup('customiser'))