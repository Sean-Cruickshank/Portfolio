type skillArray = {
    name: string,
    icon: string
}

const styleSkills = [
  { name: "HTML", icon: "devicon-html5-plain-wordmark"},
  { name: "CSS", icon: "devicon-css3-plain-wordmark"},
  { name: "Bootstrap", icon: "devicon-bootstrap-plain"},
  { name: "SASS", icon: "devicon-sass-original"},
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
  { name: "Python", icon: "devicon-python-plain"},
]

const cloudSkills = [
  { name: "Azure", icon: "devicon-azure-plain"},
  { name: "Git", icon: "devicon-git-plain"},
]

// Populates the rows of skills icons
function handleUI(arr: skillArray[]) {
    let skillsListHTML = ''
    let count = 1

    arr.forEach(skill => {
        skillsListHTML+= `
            <div class="skills__icon">
                <i class="${skill.icon}"></i>
                <p>${skill.name}</p>
            </div>
        `
        count++
    })
    return skillsListHTML
}

const styling = document.querySelector('.skills__styling')
if (styling) styling.innerHTML = handleUI(styleSkills)

const javascript = document.querySelector('.skills__js')
if (javascript) javascript.innerHTML = handleUI(javascriptSkills)

const misc = document.querySelector('.skills__misc')
if (misc) misc.innerHTML = handleUI(miscSkills)

const cloud = document.querySelector('.skills__cloud')
if (cloud) cloud.innerHTML = handleUI(cloudSkills)