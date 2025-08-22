type skillArray = {
    name: string,
    icon: string
}

const styleSkills = [
  { name: "HTML", icon: "devicon-html5-plain-wordmark"},
  { name: "CSS", icon: "devicon-css3-plain-wordmark"},
  { name: "Bootstrap", icon: "devicon-bootstrap-plain"},
  { name: "SASS/SCSS", icon: "devicon-sass-original"},
  { name: "Tailwind", icon: "devicon-tailwindcss-original"},
]

const javascriptSkills = [
  { name: "JavaScript", icon: "devicon-javascript-plain"},
  { name: "TypeScript", icon: "devicon-typescript-plain"},
  { name: "React", icon: "devicon-react-original"},
  { name: "NextJS", icon: "devicon-nextjs-original-wordmark"},
]

const miscSkills = [
  { name: ".NET Core", icon: "devicon-dotnetcore-plain"},
  { name: "SQL", icon: "devicon-azuresqldatabase-plain"},
  { name: "Azure Fundamentals", icon: "devicon-azure-plain"},
  { name: "Git/GitHub", icon: "devicon-git-plain"},
]

function handleUI(arr: skillArray[]) {
    let skillsListHTML = ''

    arr.forEach(skill => {
        skillsListHTML+= `
            <div class="skills__icon">
                <i class="${skill.icon}"></i>
            </div>
        `
    })
    return skillsListHTML
}

const styling = document.querySelector('.skills__styling')
if (styling) styling.innerHTML = handleUI(styleSkills)

const javascript = document.querySelector('.skills__js')
if (javascript) javascript.innerHTML = handleUI(javascriptSkills)

const misc = document.querySelector('.skills__misc')
if (misc) misc.innerHTML = handleUI(miscSkills)