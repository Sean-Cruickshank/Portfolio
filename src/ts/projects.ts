import type { Image, Project } from "../utils/types"
import { projectsData } from "../data/projectsData"

let projectListHTML = ""
let flip = false

projectsData.forEach(project => {
  projectListHTML += `
    <div class="projects__card">
      ${flip
        ? `${createProjectInfo(project, 'large')} ${createProjectGallery(project.gallery, 'right')}`
        : `${createProjectGallery(project.gallery, 'left')} ${createProjectInfo(project, 'large')}`
      }
      ${createProjectInfo(project, 'small')}
    </div>
  `
  flip = !flip
})

function createProjectGallery(array: Image[], position: string) {
  return `
    <div class="projects__gallery">
      <img class="projects__image image__${position}__A image__${array[0].orientation}" src=${array[0].url} />
      <img class="projects__image image__${position}__B image__${array[1].orientation}" src=${array[1].url} />
    </div>
  `
}

function createProjectInfo(project: Project, type: 'small' | 'large') {
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
  
  return `
    <div class="projects__info projects__info__${type}">
      <div class="projects__title">
        <h3>${project.title}</h3>
        ${project.link ? `<a
          title=${project.link}
          target="_blank"
          href=${project.link} class="projects__link fa-solid fa-link"
        ></a>` : ''}
      </div>
      <i class="paragraph projects__date">${project.date}</i>
      <div class="projects__paragraphs">${paragraphs}</div>
      <div class="projects__icons">${projectListTags}</div>
    </div>
  `
}

const list = document.querySelector('.projects__list')
if (list) list.innerHTML = projectListHTML