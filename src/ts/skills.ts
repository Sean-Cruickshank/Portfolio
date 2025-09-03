type skillArray = {
    name: string,
    icon: string
}

const data = [
  {
    title: 'styling',
    description: 'I think I do pretty good at styling to be honest',
    array: [
      { name: "HTML", icon: "devicon-html5-plain-wordmark"},
      { name: "CSS", icon: "devicon-css3-plain-wordmark"},
      { name: "Bootstrap", icon: "devicon-bootstrap-plain"},
      { name: "SASS", icon: "devicon-sass-original"},
      { name: "Tailwind", icon: "devicon-tailwindcss-original"},
    ]
  },
  {
    title: 'javascript',
    description: '',
    array: [
      { name: "JavaScript", icon: "devicon-javascript-plain"},
      { name: "TypeScript", icon: "devicon-typescript-plain"},
      { name: "React", icon: "devicon-react-original"},
      { name: "NextJS", icon: "devicon-nextjs-original-wordmark"},
    ]
  },
  {
    title: 'misc',
    description: '',
    array: [
      { name: ".NET Core", icon: "devicon-dotnetcore-plain"},
      { name: "SQL", icon: "devicon-azuresqldatabase-plain"},
      { name: "Python", icon: "devicon-python-plain"},
    ]
  },
  {
    title: 'cloud',
    description: '',
    array: [
      { name: "Azure", icon: "devicon-azure-plain"},
      { name: "Git", icon: "devicon-git-plain"},
    ]
  }
]

// Populates the rows of skills icons
function handleUI(arr: skillArray[]) {
    let skillsListHTML = ''

    arr.forEach(skill => {
        skillsListHTML+= `
            <div class="skills__icon hidden__fade">
                <i class="${skill.icon}"></i>
                <p>${skill.name}</p>
            </div>
        `
    })
    return skillsListHTML
}

let skillsHTML = ''

data.forEach(category => {
  skillsHTML+= `
    <div class='skills__${category.title} skills__list'>
      ${handleUI(category.array)}
    </div>
  `
})

const skills = document.querySelector('.skills')
if (skills) skills.innerHTML = skillsHTML

function renderSkills(category: string) {
  const iconArray = document.querySelectorAll(category)
  console.log(iconArray)
  let delay = 0
  iconArray.forEach(icon => {
      setTimeout(() => {
          icon.classList.remove('hidden__fade')
      }, delay)
      delay+= 350
  })
}

let stylingThreshold = false
let javascriptThreshold = false
let miscThreshold = false
let cloudThreshold = false

window.addEventListener('scroll', () => {
  const position = Math.floor(scrollY)
  console.log(position)
  if (position > 300 && !stylingThreshold) {
    renderSkills('.skills__styling .skills__icon')
    stylingThreshold = true
  }

  if (position > 500 && !javascriptThreshold) {
  renderSkills('.skills__javascript .skills__icon')
  javascriptThreshold = true
  }

  if (position > 700 && !miscThreshold) {
  renderSkills('.skills__misc .skills__icon')
  miscThreshold = true
  }

  if (position > 900 && !cloudThreshold) {
  renderSkills('.skills__cloud .skills__icon')
  cloudThreshold = true
  }
})