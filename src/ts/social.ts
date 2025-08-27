// Cascading fade in for social icons
const iconArray = document.querySelectorAll('.social__icon')
let delay = 500
setTimeout(() => {
    iconArray.forEach(icon => {
        setTimeout(() => {
            icon.classList.remove('hidden')
        }, delay)
        delay+= 500
    })

}, 500)

// Scroll to top button functionality
const icon = document.querySelector('.to-top__icon')
icon?.addEventListener('click', () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
})

// Conditionally render scroll to top button if not at the top of the page
window.addEventListener('scroll', () => {
    const position = Math.floor(scrollY)
    if (icon) {
        if (position > 25) {
            icon.classList.remove('hidden')
        } else {
            icon.classList.add('hidden')
        }

    }
})