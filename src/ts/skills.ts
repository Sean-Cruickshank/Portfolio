type skillArray = {
    name: string,
    icon: string
}

const data = [
  {
    title: 'styling',
    description: [
      'I have spent a lot of time styling with CSS and feel confident with the common extensions and frameworks',
      'I typically aim for a mobile-first approach and strive to create applications that are dynamic and responsive'
    ],
    render: { flag: false, breakpoint: 1000 },
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
      "JavaScript is probably the language I am the most familiar with, though these days I tend to use TypeScript by default",
      "I am also very familiar with React, and more recently have expanded into Next.JS which I enjoy too!",
      "I hope to familiarise myself with more frameworks in the future, so hopefully this list will grow very soon!"
    ],
    render: { flag: false, breakpoint: 1400 },
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
      'I spent a lot of time working with C# and .NET during my degree, and I have plans to expand on this in the near future',
      'I have spent a bit of time working with PostgreSQL databases, and generally have a pretty solid grasp on SQL syntax',
      "I've gotten into Python more recently, and although I think I still have a lot to learn, I have had a lot of fun utilising it with different AI models"
    ],
    render: { flag: false, breakpoint: 1800 },
    array: [
      { name: ".NET Core", icon: "devicon-dotnetcore-plain" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
    ]
  },
  {
    title: 'cloud',
    description: [
      'I completed my Azure Fundamentals certification in March 2025 and hope to delve deeper into the Azure pathway in the future',
      'I have only ever committed to dev one time accidentally!'
    ],
    render: { flag: false, breakpoint: 2200 },
    array: [
      { name: "Azure Fundamentals", icon: "devicon-azure-plain"},
      { name: "Git", icon: "devicon-git-plain"},
    ]
  },
]

// Creates the div for each category and populates it, inserts all divs into the top-level 'skills' div
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
                <i title="${skill.name}" class="${skill.icon}"></i>
                <p>${skill.name}</p>
            </div>
        `
    })
    return skillsListHTML
}

// Triggers each category to be rendered when the breakpoint is reached
window.addEventListener('scroll', () => {
  const position = Math.floor(scrollY)
  console.log(position)
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