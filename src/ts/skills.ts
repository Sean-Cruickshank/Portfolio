import { skillsData } from "../data/skillsData"

type skillArray = {
    name: string,
    icon: string
}

let menuHTML = ''

// Generates the buttons for each category
skillsData.forEach(category => {
  menuHTML += `
    <div class='skills__menu__item'>
      <button class='skills__menu__button skills__menu__${category.title}'>
        <div>
          <i title="${category.array[0].name}" class="${category.array[0].icon}"></i>
          <p>${category.title.toUpperCase()}</p>
        </div>
      </button>
    </div>
  `
})
const skillsMenu = document.querySelector('.skills__menu')
if (skillsMenu) skillsMenu.innerHTML = menuHTML

// Adds onclick functionality for the buttons
skillsData.forEach(category => {
  const button = document.querySelector(`.skills__menu__${category.title}`)
  button?.addEventListener('click', () => changePage(category.id))
})

function changePage(num: number) {
  console.log(num)
  let contentHTML = ''
  let category = skillsData[num]

  let paragraphHTML = ''
  category.description.forEach(paragraph => {
    paragraphHTML += `<p>${paragraph}</p>`
  })

  contentHTML = `
    <h3>${category.title}</h3>
    <div>${paragraphHTML}</div>
    <div class='skills__list'>${generateIcons(category.array)}</div>
  `

  const skills = document.querySelector('.skills__content')
  if (skills) skills.innerHTML = contentHTML

  function generateIcons(arr: skillArray[]) {
      let skillsListHTML = ''
      arr.forEach(skill => {
          skillsListHTML+= `
              <div class="skills__icon">
                <i title="${skill.name}" class="${skill.icon}"></i>
              </div>
          `
      })
      return skillsListHTML
  }
}

changePage(0)