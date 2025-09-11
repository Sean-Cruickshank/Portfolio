type Project = {
  title: string,
  link: string,
  date: string,
  gallery: Image[],
  tags: Tag[],
  description: string[]
}

type Image = {
  url: string;
  orientation: "landscape" | "portrait" | "square";
}

type Tag = {
  title: string,
  class: string
}

const projectData: Project[] = [
  {
    title: "AI Building Memory Project",
    link: "/",
    date: "2025",
    gallery: [

    ],
    tags: [
      {title: 'Tailwind', class: 'devicon-tailwindcss-original'},
      {title: 'TypeScript', class: 'devicon-typescript-plain'},
      {title: 'Next.JS', class: 'devicon-nextjs-original-wordmark'},
      {title: 'Python', class: 'devicon-python-plain'},
      {title: 'SQL', class: "devicon-azuresqldatabase-plain"},
    ],
    description: [
      "An AI-powered chatbot and information retrieval system built for the construction sector",
      "Created over the course of 3 months as part of an AI Accelerator program",
      "Utilises LLMs, custom system prompts, and RAG embedding to reliably retrieve information from a database"
    ]
  },
  {
    title: "Country Quiz",
    link: "/",
    date: "2025",
    gallery: [

    ],
    tags: [
      {title: 'SASS', class: 'devicon-sass-original'},
      {title: 'TypeScript', class: 'devicon-typescript-plain'},
      {title: 'React', class: 'devicon-react-original'},
    ],
    description: [
      "A small tile-based game created in JavaScript in under 24 hours. Collect keys to get as many points as you can in under 30 seconds. I didn't really make this one to showcase a skill I just thought it was fun."
    ]
  },
  {
    title: "Tile Game",
    link: "/tilegame",
    date: "2024",
    gallery: [
      {url: "images/tile_game/level_one.png", orientation: 'square'},
      {url: "images/tile_game/level_five.png", orientation: 'square'},
    ],
    tags: [
      {title: 'HTML', class: 'devicon-html5-plain-wordmark'},
      {title: 'CSS', class: 'devicon-css3-plain-wordmark'},
      {title: 'JavaScript', class: 'devicon-javascript-plain'},
      {title: 'React', class: 'devicon-react-original'},
    ],
    description: [
      "A small tile-based game created in JavaScript in under 24 hours. Collect keys to get as many points as you can in under 30 seconds",
      "I didn't really make this one to showcase a skill I just thought it was fun"
    ]
  },
  {
    title: "coolspacefacts.com",
    link: "https://coolspacefacts.com/",
    date: "2023",
    gallery: [
      { url: "images/cool_space_facts/csp_standard.png", orientation: 'portrait'},
      { url: "images/cool_space_facts/csp_wide.png", orientation: 'landscape'},
    ],
    tags: [
      {title: 'HTML', class: 'devicon-html5-plain-wordmark'},
      {title: 'CSS', class: 'devicon-css3-plain-wordmark'},
      {title: 'JavaScript', class: 'devicon-javascript-plain'},
      {title: 'React', class: 'devicon-react-original'},
    ],
    description: [
      "An interactive and educational space facts website. Each page contains a ranking of different space objects, from smallest to largest, based on a specific theme.",
      "This was one of my first attempts at creating a live website, and although it is pretty simple I learned a lot while making it.",
      "I also thought it was a cool domain name to own 😎"
    ],
  },
]

let projectListHTML = ""
let flip = false

projectData.forEach(project => {
  let projectListTags = ""
  let paragraphs = ""
  let tagCount = 0

  project.tags.forEach(tag => {
    const title = project.tags[tagCount++].title
    projectListTags += `
      <i
        class="${tag.class} projects__icon"
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

  projectListHTML += `
    <div class="projects__card">
      ${flip
        ? `${createGallery(project.gallery, 'left')} ${projectsInfo}`
        : `${projectsInfo} ${createGallery(project.gallery, 'right')}`
      }
    </div>
  `
  flip = !flip
})

function createGallery(array: Image[], position: string) {
  let galleryHTML = ''
  let count = 1
  array.forEach(image => {
    count <= 3 ? galleryHTML+= `<img class="projects__image image__${position}__${count} image__${image.orientation}" src=${image.url} />` : null
    count++
  })
  return `<div class="projects__gallery">${galleryHTML}</div>`
}

const list = document.querySelector('.projects__list')
if (list) list.innerHTML = projectListHTML