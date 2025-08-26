export const projectData = [
  {
    title: "coolspacefacts.com",
    link: "https://coolspacefacts.com/",
    date: "2023 - 2024",
    image: "images/cool_space_facts.png",
    tagsText: [
      "HTML5", "CSS3", "JavaScript", "React"
    ],
    tagsClass: [
      "devicon-html5-plain-wordmark",
      "devicon-css3-plain-wordmark",
      "devicon-javascript-plain",
      "devicon-react-original"
    ],
    description: [
      "An interactive and educational space facts website. Each page contains a ranking of different space objects, from smallest to largest, based on a specific theme.",
      "This was one of my first attempts at creating a live website, and although it is pretty simple I learned a lot while making it.",
      "Utilises react-router and React hooks."
    ],
  },
  {
    title: "Tile Game",
    link: "/tilegame",
    date: "2024",
    image: "images/tile_game.png",
    tagsText: [
      "HTML5", "CSS3", "JavaScript", "React"
    ],
    tagsClass: [
      "devicon-html5-plain-wordmark",
      "devicon-css3-plain-wordmark",
      "devicon-javascript-plain",
      "devicon-react-original"
    ],
    description: [
      "A small tile-based game created in JavaScript in under 24 hours. Collect keys to get as many points as you can in under 30 seconds. I didn't really make this one to showcase a skill I just thought it was fun."
    ]
  },
]

let projectListHTML = ""

projectData.forEach(project => {
  let projectListTags = ""
  let paragraphs = ""
  let count = 0

  project.tagsClass.forEach(tag => {
    const title = project.tagsText[count++]
    projectListTags += `
      <i
        class="${tag} projects__icon"
        title=${title}
      ></i>
    `
  })

  project.description.forEach(paragraph => {
    paragraphs += `
      <p>${paragraph}</p>
    `
  })

  projectListHTML += `
    <div class="projects__card">

      <div class="projects__info">
        <div class="projects__title">
          <h3>${project.title}</h3>
          <a
            title=${project.link}
            target="_blank"
            href=${project.link} class="projects__link fa-solid fa-link"
          ></a>
        </div>
        <i class="paragraph projects__date">${project.date}</i>
        <div class="projects__paragraphs">${paragraphs}</div>
        <div class="projects__icons">${projectListTags}</div>
      </div>

      <div class="projects__gallery">
        <img class="projects__image" src=${project.image} />
      </div>
      
    </div>
  `
})

const list = document.querySelector('.projects__list')
if (list) list.innerHTML = projectListHTML