import { highScore } from "./game";

const customiserButton = document.querySelector('.customiser-button')

let customColour = localStorage.getItem('custom-colour') || 'white'
let selectedColour = localStorage.getItem('colour') || '#3F48CC'

let isCustomSelected = false

export function renderCustomiserButton() {
  const arrowColour = localStorage.getItem('arrow') || 'black'
  if (customiserButton)
  customiserButton.innerHTML = `
    <div
        class="player-icon"
        style="
          background-color: ${selectedColour};
          height: 100%;
          background-image: url(/images/tilegame/player-template-${arrowColour}.png);
        "
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

const arrowArray = [
  {name: 'Black', hex: '#000000'},
  {name: 'White', hex: '#FFFFFF'},
  {name: 'Gold', hex: '#D2AE3A'},
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

export function colourElementOnInput() {
  const colourElement: HTMLInputElement | null = document.querySelector('.colour-input')
  if (colourElement) {
    changeColour(colourElement.value)
    customColour = colourElement.value
  }
  localStorage.setItem('custom-colour', customColour)
}

export function selectElementOnInput() {  
  const selectElement: HTMLSelectElement | null = document.querySelector('.colour-select')
  const colourElement: HTMLInputElement | null = document.querySelector('.colour-input')
  if (selectElement) {
    if (selectElement.value === '#FFFFFF') {
      changeColour(customColour)
      colourElement && colourElement.click()
    } else {
      changeColour(selectElement.value)
    }
  }
}

export function arrowElementOnInput() {
  const arrowElement: HTMLSelectElement | null = document.querySelector('.arrow-select')
  const arrowValue = arrowArray.find(item => item.hex === arrowElement?.value)?.name.toLowerCase() || 'black'
  if (arrowElement) localStorage.setItem('arrow', arrowValue)
  renderCustomiserButton()
}

export function setColourSelect() {
  const selectElement: HTMLSelectElement | null = document.querySelector('.colour-select')
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

export function setArrowSelect() {
  const arrowColour = localStorage.getItem('arrow') || 'black'
  const arrowElement: HTMLSelectElement | null = document.querySelector('.arrow-select')
  let optionHTML = ''
  arrowArray.forEach(option => {
    optionHTML += `
      <option
        value="${option.hex}"
        title="${option.name}"
        ${option.name.toLowerCase() === arrowColour ? 'selected=true' : ''}
      >${option.name}</option>
    `
  })
  if (arrowElement) arrowElement.innerHTML = `
    <select class="arrow-select" name="arrow" id="arrow-select">
      ${optionHTML}
    </select>
  `
}

renderCustomiserButton()

export { selectedColour }