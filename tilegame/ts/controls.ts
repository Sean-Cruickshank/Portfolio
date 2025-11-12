import { gameActive, plateArray, playerPos, renderGrid, setValues } from "./game"

function movePos(direction: string) {
  if (gameActive) {
    if (direction === 'ArrowLeft') {
      const check = plateArray.find(plate => plate.x === playerPos.x - 1 && plate.y === playerPos.y)
      if (check && !check.grey && playerPos.x > 1) playerPos.x--
      renderGrid()
    }
    if (direction === 'ArrowRight') {
      const check = plateArray.find(plate => plate.x === playerPos.x + 1 && plate.y === playerPos.y)
      if (check && !check.grey && playerPos.x < 12) playerPos.x++
      renderGrid()
    }
    if (direction === 'ArrowUp') {
      const check = plateArray.find(plate => plate.x === playerPos.x && plate.y === playerPos.y - 1)
      if (check && !check.grey && playerPos.y > 1) playerPos.y--
      renderGrid()
    }
    if (direction === 'ArrowDown') {
      const check = plateArray.find(plate => plate.x === playerPos.x && plate.y === playerPos.y + 1)
      if (check && !check.grey && playerPos.y < 12) playerPos.y++
      renderGrid()
    }
  }
}

function refreshTiles() {
  setValues();
  renderGrid();
}

document.querySelector('.refresh-button')?.addEventListener('click', () => refreshTiles())

addEventListener('keydown', (input) => {
  if (gameActive) {
    movePos(input.key);
    if (input.key === 'Enter') {
      refreshTiles()
    }
  }
})

let touchpadEnabled = false

function toggleTouchpad() {
  const controlPanel = document.querySelector('.control-panel')
  const touchControls = document.querySelector('.touch-controls')
  const toggleTouchpadButton = document.querySelector('.toggle-touchpad-button')
  
  toggleTouchpadButton?.addEventListener('click', () => {
    if (touchpadEnabled) {
      touchpadEnabled = false
      controlPanel?.classList.remove('control-panel-tc')
      touchControls?.classList.add('hidden')
    } else {
      touchpadEnabled = true
      controlPanel?.classList.add('control-panel-tc')
      touchControls?.classList.remove('hidden')
    }
  })
}

let xDown: number | null = null;
let yDown: number | null = null;

function handleSwipeStart(event: TouchEvent) {
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
}

function handleSwipeEnd(event: TouchEvent) {
  if (!xDown || !yDown) return

  const xUp = event.changedTouches[0].clientX;
  const yUp = event.changedTouches[0].clientY;
  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (!touchpadEnabled) {
    if (Math.abs(xDiff) > Math.abs(yDiff)) {  
      xDiff > 0 ? movePos('ArrowLeft') : movePos('ArrowRight')
    } else {
      yDiff > 0 ? movePos('ArrowUp') : movePos('ArrowDown')
    }
  }
  xDown = null;
  yDown = null;
}

addEventListener('touchstart', handleSwipeStart);
addEventListener('touchend', handleSwipeEnd);

const directions = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

directions.forEach(arrow => {
  document.querySelector(`.${arrow}`)?.addEventListener('click', () => touchpad(arrow))
})

function touchpad(direction: string) {
  if (touchpadEnabled) movePos(direction)
}

export { toggleTouchpad }