type skillArray = {
    name: string,
    icon: string
}

const data = [
  {
    title: 'styling',
    description: [
      'I think I do pretty good at styling to be honest'
    ],
    render: { flag: false, breakpoint: 300 },
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
    description: [
      "I try to use TypeScript by default now. Next.JS is pretty cool but I've only used it once"
    ],
    render: { flag: false, breakpoint: 600 },
    array: [
      { name: "JavaScript", icon: "devicon-javascript-plain"},
      { name: "TypeScript", icon: "devicon-typescript-plain"},
      { name: "React", icon: "devicon-react-original"},
      { name: "NextJS", icon: "devicon-nextjs-original-wordmark"},
    ]
  },
  {
    title: 'misc',
    description: [
      'Just some random other shit I know'
    ],
    render: { flag: false, breakpoint: 900 },
    array: [
      { name: ".NET Core", icon: "devicon-dotnetcore-plain"},
      { name: "SQL", icon: "devicon-azuresqldatabase-plain"},
      { name: "Python", icon: "devicon-python-plain"},
    ]
  },
  {
    title: 'cloud',
    description: [
      'Passed my Azure Fundamentals cert in March 2025.',
      'I have only ever committed to dev one time accidentally'
    ],
    render: { flag: false, breakpoint: 1200 },
    array: [
      { name: "Azure", icon: "devicon-azure-plain"},
      { name: "Git", icon: "devicon-git-plain"},
    ]
  },
]

// Creates the div for each category and populates it, inserts all divs into the top 'skills' div
let skillsHTML = ''
data.forEach(category => {
  let descriptionHTML = ''
  category.description.forEach(paragraph => {
    descriptionHTML+= `<p>${paragraph}</p>`
  })

  skillsHTML+= `
    <div>
      <div class='skills__${category.title} skills__list'>
        ${handleUI(category.array)}
      </div>
      ${descriptionHTML}
    </div>
  `
})
const skills = document.querySelector('.skills__section')
if (skills) skills.innerHTML = skillsHTML

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

// Triggers each category to be rendered when the breakpoint is reached
window.addEventListener('scroll', () => {
  const position = Math.floor(scrollY)
  data.forEach(category => {
    if (position > category.render.breakpoint && !category.render.flag) {
      renderSkills(`.skills__${category.title}`)
      category.render.flag = true
    }
  })
})

function renderSkills(category: string) {
  const iconArray = document.querySelectorAll(`${category} .skills__icon`)
  let delay = 0
  iconArray.forEach(icon => {
      setTimeout(() => {
          icon.classList.remove('hidden__fade')
      }, delay)
      delay+= 150
  })
}