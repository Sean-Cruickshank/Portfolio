export function toggleButtons(activator: string, condition: 'enable' | 'disable') {

    const buttonsList = ['reset-score', 'start-game', 'customiser', 'about', 'settings']
    let index = buttonsList.indexOf(activator)
    index > -1 ? buttonsList.splice(index, 1) : console.warn('Invalid activator for toggleButtons')

    buttonsList.forEach(page => {
        const button = document.querySelector(`.${page}-button`) as HTMLButtonElement;
        if (condition === 'enable') {
            button.disabled = false
            button?.classList.remove('button-disabled')
        } else if (condition === 'disable') {
            button.disabled = true
            button?.classList.add('button-disabled')
        }
    })
}

export function rollOdds(num: number) {
  const ran = (Number(Math.random().toFixed(2)) * 100)
  return ran <= num
}

export function boost(val: number, element: string) {
  const boost = document.querySelector(element)
  if (boost) {
    boost.innerHTML = `<p>+${val}</p>`
    boost.classList.add('boost-active')
    setTimeout(() => {
      boost.classList.remove('boost-active')
      boost.innerHTML = `<p></p>`
    }, 500)
  } else console.warn('No boost element selected')
}

export function randomPos() {
  let x = Math.ceil(Math.random() * 12);
  let y = Math.ceil(Math.random() * 12);
  return {x, y}
}