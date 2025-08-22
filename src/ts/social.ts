const iconArray = document.querySelectorAll('.social__icon')

let delay = 500
setTimeout(() => {
    iconArray.forEach(icon => {
        setTimeout(() => {
            icon.classList.add('active')
        }, delay)
        delay+= 500
    })

}, 500)