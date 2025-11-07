type skillArray = {
    name: string,
    icon: string
}

const data = [
    {
    id: 0,
    title: 'javascript',
    description: [
      "JavaScript is probably the language I am the most familiar with, though these days I tend to use TypeScript by default",
      "I am also very familiar with React, and more recently have expanded into Next.JS which I enjoy too!",
      "I hope to familiarise myself with more frameworks in the future, so hopefully this list will grow very soon!"
    ],
    array: [
      { name: "JavaScript", icon: "devicon-javascript-plain"},
      { name: "TypeScript", icon: "devicon-typescript-plain"},
      { name: "React", icon: "devicon-react-original"},
      { name: "NextJS", icon: "devicon-nextjs-original-wordmark"},
    ]
  },
  {
    id: 1,
    title: 'styling',
    description: [
      'I have spent a lot of time styling with CSS and feel confident with the common extensions and frameworks',
      'I typically aim for a mobile-first approach and strive to create applications that are dynamic and responsive'
    ],
    array: [
      { name: "CSS", icon: "devicon-css3-plain-wordmark"},
      { name: "Bootstrap", icon: "devicon-bootstrap-plain"},
      { name: "SASS", icon: "devicon-sass-original"},
      { name: "Tailwind", icon: "devicon-tailwindcss-original"},
    ]
  },
  {
    id: 2,
    title: 'backend',
    description: [
      'I spent a lot of time working with C# and .NET during my degree, and I have plans to expand on this in the near future',
      'I have spent a bit of time working with PostgreSQL databases, and generally have a pretty solid grasp on SQL syntax',
      "I've gotten into Python more recently, and although I think I still have a lot to learn, I have had a lot of fun utilising it with different AI models"
    ],
    array: [
      { name: ".NET Core", icon: "devicon-dotnetcore-plain" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
    ]
  },
  {
    id: 3,
    title: 'cloud',
    description: [
      'I completed my Azure Fundamentals certification in March 2025 and hope to delve deeper into the Azure pathway in the future',
      'I have only ever committed to dev one time accidentally!'
    ],
    array: [
      { name: "Azure Fundamentals", icon: "devicon-azure-plain"},
      { name: "Git", icon: "devicon-git-plain"},
    ]
  },
]

let menuHTML = ''

// Generates the buttons for each category
data.forEach(category => {
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
data.forEach(category => {
  const button = document.querySelector(`.skills__menu__${category.title}`)
  button?.addEventListener('click', () => changePage(category.id))
})

function changePage(num: number) {
  console.log(num)
  let contentHTML = ''
  let category = data[num]

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