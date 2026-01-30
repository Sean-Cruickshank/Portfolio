import type { Project } from "../utils/types"

export const projectsData: Project[] = [
  {
    title: "AI Building Memory Project",
    link: null,
    date: "2025",
    gallery: [
      {url: "images/gallery/southbase_B.png", orientation: 'square'},
      {url: "images/gallery/southbase_A.png", orientation: 'landscape'},
    ],
    tags: [
      {title: 'Tailwind', class: 'devicon-tailwindcss-original'},
      {title: 'TypeScript', class: 'devicon-typescript-plain'},
      {title: 'Next.JS', class: 'devicon-nextjs-original-wordmark'},
      {title: 'Python', class: 'devicon-python-plain'},
      {title: 'PostgreSQL', class: "devicon-postgresql-plain"},
    ],
    description: [
      "An AI-powered chatbot and information retrieval system tailored to the construction industry on behalf of Preformance/Southbase",
      "Designed, created, and iterated over the course of 3 months as part of an AI Accelerator program through Seen Ventures",
      "Utilises LLMs, custom system prompts, and RAG embedding to reliably retrieve information from a database and cite sources used"
    ]
  },
  {
    title: "Country Quiz",
    link: "https://seanscountryquiz.netlify.app/",
    date: "2025",
    gallery: [
      {url: "images/gallery/cq_stats.png", orientation: 'square'},
      {url: "images/gallery/cq_match.png", orientation: 'square'},
    ],
    tags: [
      {title: 'HTML', class: 'devicon-html5-plain-wordmark'},
      {title: 'CSS', class: 'devicon-css3-plain-wordmark'},
      {title: 'SASS', class: 'devicon-sass-original'},
      {title: 'TypeScript', class: 'devicon-typescript-plain'},
      {title: 'React', class: 'devicon-react-original'},
    ],
    description: [
      "Randomly generates quiz-style questions about the size and population of different countries",
      "Includes player statistics and a match history so players can see themselves improve their geography knowledge"
    ]
  },
  {
    title: "Tile Game",
    // link: "/tilegame/index.html", // for localhost
    link: "/tilegame", // for deployment
    date: "2024",
    gallery: [
      {url: "images/gallery/level_one.png", orientation: 'square'},
      {url: "images/gallery/level_five.png", orientation: 'square'},
    ],
    tags: [
      {title: 'HTML', class: 'devicon-html5-plain-wordmark'},
      {title: 'CSS', class: 'devicon-css3-plain-wordmark'},
      {title: 'JavaScript', class: 'devicon-javascript-plain'},
      {title: 'React', class: 'devicon-react-original'},
    ],
    description: [
      "A small tile-based game created in JavaScript. Collect keys to get as many points as you can before the timer runs out",
      "Originally created in under 24 hours as a fun challenge for myself, but I've since come back to it a few times to make tweaks and improvements",
      "I didn't really make this one to showcase a skill I just thought it was fun"
    ]
  },
  {
    title: "coolspacefacts.com",
    link: "https://coolspacefacts.com/",
    date: "2023",
    gallery: [
      { url: "images/gallery/csp_standard.png", orientation: 'portrait'},
      { url: "images/gallery/csp_sources.png", orientation: 'square'},
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