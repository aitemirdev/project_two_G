// Modal Window
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseBtn = document.querySelector(".modal_close")

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
modalTrigger.onclick = () => {
    openModal()
}
modalCloseBtn.onclick = () => {
    closeModal()
}
modal.onclick = (event) => {
    if (event.target === modal){
        closeModal()
    }
}

const scroollWindow = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        openModal()
        window.removeEventListener('scroll', scroollWindow)
    }

}

window.addEventListener('scroll', scroollWindow)

const openModalAfterDelay = (delay) => {
    setTimeout(() => {
        openModal()
    }, delay * 1000)
}

openModalAfterDelay(10)