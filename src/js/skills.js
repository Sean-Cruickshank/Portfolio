const skillsData = [
//   { name: "HTML", icon: "devicon-html5-plain-wordmark"},
//   { name: "CSS", icon: "devicon-css3-plain-wordmark"},
  { name: "Bootstrap", icon: "devicon-bootstrap-plain"},
  { name: "SASS/SCSS", icon: "devicon-sass-original"},
  { name: "Tailwind", icon: "devicon-tailwindcss-original"},
  { name: "JavaScript", icon: "devicon-javascript-plain"},
  { name: "TypeScript", icon: "devicon-typescript-plain"},
  { name: "React", icon: "devicon-react-original"},
  { name: "NextJS", icon: "devicon-nextjs-original-wordmark"},
  { name: ".NET Core", icon: "devicon-dotnetcore-plain"},
  { name: "SQL", icon: "devicon-azuresqldatabase-plain"},
  { name: "Azure Fundamentals", icon: "devicon-azure-plain"},
  { name: "Git/GitHub", icon: "devicon-git-plain"},
]

const skillsList = document.querySelector('.skills__list')
let skillsListHTML = ''

skillsData.forEach(skill => {
    skillsListHTML+= `
        <div class="skills__icon">
            <i class="${skill.icon}"></i>
        </div>
    `
})

skillsList.innerHTML = skillsListHTML