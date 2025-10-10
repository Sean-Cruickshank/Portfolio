import { highScore } from "./game";

const customiserButton = document.querySelector('.customiser-button')
const arrowElement: HTMLSelectElement | null = document.querySelector('.arrow-select')
const selectElement: HTMLSelectElement | null = document.querySelector('.colour-select');
const colourElement: HTMLInputElement | null = document.querySelector('.colour-input')

let customColour = localStorage.getItem('custom-colour') || 'white'
let selectedColour = localStorage.getItem('colour') || 'blue'

let isCustomSelected = false

function renderCustomiserButton() {
  if (customiserButton && arrowElement)
  customiserButton.innerHTML = `
    <div
        class="player-icon player-icon-${arrowElement.value}"
        style="background-color: ${selectedColour}; height: 100%;"
        title="Customisation Settings"
    ></div>
  `
}

export const colourArray = [
  {name: 'Blue', hex: '#3F48CC', locked: false, required: 0},
  {name: 'Red', hex: '#ED1C24', locked: false, required: 0},
  {name: 'Yellow', hex: '#FFF200', locked: false, required: 0},
  {name: 'Green', hex: '#22B14C', locked: false, required: 0},
  {name: 'Teal', hex:'#21A7B1', locked: true, required: 10},
  {name: 'Orange', hex: '#FF7F27', locked: true, required: 15},
  {name: 'Custom', hex: '#FFFFFF', locked: true, required: 20},
]

function customCheck() {
  const match = colourArray.find(colour => colour.hex === selectedColour)
  isCustomSelected = !match
}

export function changeColour(colour: string) {
  selectedColour = colour
  localStorage.setItem('colour', colour)
  renderCustomiserButton()
}

selectElement && selectElement.addEventListener('input', () => {
  if (selectElement.value === '#FFFFFF') {
    changeColour(customColour)
    colourElement && colourElement.click()
  } else {
    changeColour(selectElement.value)
  }
})

colourElement && colourElement.addEventListener('input', () => {
  changeColour(colourElement.value)
  customColour = colourElement.value
  localStorage.setItem('custom-colour', customColour)
})

arrowElement && arrowElement.addEventListener('input', () => {
  renderCustomiserButton()
})

export function setColourPicker() {
  let optionHTML = ''
  customCheck()
  colourArray.forEach(option => {
    optionHTML+= `
      <option
        value="${option.hex}"
        title="${option.name}"
        ${option.hex === selectedColour || option.hex === '#FFFFFF' && isCustomSelected ? 'selected="true"' : ''}
        ${highScore < option.required ? 'disabled="true"' : ''}
      >${highScore < option.required ? `${option.name} (required score: ${option.required})` : option.name}</option>
    `
  })
  if (selectElement) selectElement.innerHTML = `
    <select class="colour-select colour-select" name="colour" id="colour-select">
      ${optionHTML}
    </select>
  `
}

renderCustomiserButton()

export { selectedColour }