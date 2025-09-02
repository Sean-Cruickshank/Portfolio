type skillArray = {
    name: string,
    icon: string
}

const styleSkills = [
  { name: "HTML", icon: "devicon-html5-plain-wordmark"},
  { name: "CSS", icon: "devicon-css3-plain-wordmark"},
  { name: "Bootstrap", icon: "devicon-bootstrap-plain"},
  { name: "SASS/SCSS", icon: "devicon-sass-original"},
  { name: "Tailwind", icon: "devicon-tailwindcss-original"},
]

const javascriptSkills = [
  { name: "JavaScript", icon: "devicon-javascript-plain"},
  { name: "TypeScript", icon: "devicon-typescript-plain"},
  { name: "React", icon: "devicon-react-original"},
  { name: "NextJS", icon: "devicon-nextjs-original-wordmark"},
]

const miscSkills = [
  { name: ".NET Core", icon: "devicon-dotnetcore-plain"},
  { name: "SQL", icon: "devicon-azuresqldatabase-plain"},
  { name: "Azure Fundamentals", icon: "devicon-azure-plain"},
  { name: "Git/GitHub", icon: "devicon-git-plain"},
  { name: "Python", icon: "devicon-python-plain"},
]

// Populates the rows of skills icons
function handleUI(arr: skillArray[]) {
    let skillsListHTML = ''

    arr.forEach(skill => {
        skillsListHTML+= `
            <div class="skills__icon">
                <i class="${skill.icon}"></i>
            </div>
        `
    })
    return skillsListHTML
}

const styling = document.querySelector('.skills__styling')
if (styling) styling.innerHTML = handleUI(styleSkills)

const javascript = document.querySelector('.skills__js')
if (javascript) javascript.innerHTML = handleUI(javascriptSkills)

const misc = document.querySelector('.skills__misc')
if (misc) misc.innerHTML = handleUI(miscSkills)

const detailsArray = [
  {
    subtitle: 'Styling',
    description: [
      'This is a test of the description',
      'Hopefully this will display correctly on the styling page'
    ]
  },
  {
    subtitle: 'JavaScript',
    description: [
      'This is a test of the description',
      'Hopefully this will display correctly on the javascript page'
    ]
  },
  {
    subtitle: 'Misc',
    description: [
      'This is a test of the description',
      'Hopefully this will display correctly on the misc page'
    ]
  },
]

// Adds functionality for the back and forward buttons
const backButton = document.querySelector('.skills__back-button')
backButton?.addEventListener('click', () => handleDetails('-'))

const forwardButton = document.querySelector('.skills__forward-button')
forwardButton?.addEventListener('click', () => handleDetails('+'))

// 
let position = 0
function handleDetails(val: '+' | '-' | 0) {
  if (val === '+') position < detailsArray.length - 1 ? position++ : position = 0
  if (val === '-') position > 0 ? position-- : position = detailsArray.length - 1
  if (val === 0) position === 0

  const subtitle = document.querySelector('.skills__subtitle h3')
  if (subtitle) subtitle.innerHTML = detailsArray[position].subtitle

  let descriptionHTML = ``
  detailsArray[position].description.forEach(paragraph => {
    descriptionHTML += `<p>${paragraph}</p>`
  })

  const description = document.querySelector('.skills__description')
  if (description) description.innerHTML = descriptionHTML
}

handleDetails(0)