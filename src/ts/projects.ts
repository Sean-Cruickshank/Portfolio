type Project = {
  title: string,
  link: string,
  date: string,
  gallery: Image[],
  tagsText: string[],
  tagsClass: string[],
  description: string[]
}

type Image = {
  url: string;
  orientation: "landscape" | "portrait" | "square";
}

export const projectData: Project[] = [
  {
    title: "coolspacefacts.com",
    link: "https://coolspacefacts.com/",
    date: "2023",
    gallery: [
      { url: "images/cool_space_facts/csp_standard.png", orientation: 'portrait'},
      { url: "images/cool_space_facts/csp_wide.png", orientation: 'landscape'},
    ],
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
      "I also thought it was a cool domain name to own 😎"
    ],
  },
  {
    title: "Tile Game",
    link: "/tilegame",
    date: "2024",
    gallery: [
      {url: "images/tile_game/level_one.png", orientation: 'square'},
      {url: "images/tile_game/level_five.png", orientation: 'square'},
    ],
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
let flip = false

projectData.forEach(project => {
  let projectListTags = ""
  let paragraphs = ""
  let tagCount = 0

  project.tagsClass.forEach(tag => {
    const title = project.tagsText[tagCount++]
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

  let projectsInfo = `
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
  `

  let projectsGallery = `
    <div class="projects__gallery">
      ${createGallery(project.gallery)}
    </div>
  `

  projectListHTML += `
    <div class="projects__card">
      ${flip ? `${projectsGallery} ${projectsInfo}` : `${projectsInfo} ${projectsGallery}`}
    </div>
  `
  flip = !flip
})

function createGallery(array: Image[]) {
  let galleryHTML = ''
  let count = 1
  array.forEach(image => {
    count <= 3 ? galleryHTML+= `<img class="projects__image image__${count} image__${image.orientation}" src=${image.url} />` : null
    count++
  })
  return galleryHTML
}

const list = document.querySelector('.projects__list')
if (list) list.innerHTML = projectListHTML