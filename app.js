const flexContainer = document.querySelector('.flex-container'),
  modal = document.querySelector('.my-modal'),
  modalContent = document.querySelector('.my-modal-content')

let images

async function getImages() {
  const response = await fetch('images.json')
  const data = await response.json()
  return data
}

getImages().then(i => {
  i.forEach(x => flexContainer.innerHTML += `<img src="${x}" alt="" />`)
  images = Array.from(document.querySelectorAll('img'))
  images.forEach(x => x.addEventListener('click', modalToggle))
})

modal.addEventListener('click', x => x.target.classList.contains('my-modal-content') ? closeModal() : false)

document.addEventListener('keydown', e => {
  if (modal.style.display === 'block') {
    e.keyCode === 27 ? closeModal() : false
    //left is 37
    e.keyCode === 37 ? prevImg() : false
    //right is 39
    e.keyCode === 39 ? nextImg() : false
  }
})

function nextImg() {
  let modalImage = document.getElementById('modal-image')
  let currentIndx = images.reduce((n, x, i) => {
    x.src === modalImage.src ? n = i : false
    return n === images.length - 1 ? -1 : n
  }, 0)
  modalImage.src = images[currentIndx + 1].src
}

function prevImg() {
  let modalImage = document.getElementById('modal-image')
  let currentIndx = images.reduce((n, x, i) => {
    x.src === modalImage.src ? n = i : false
    return n === 0 ? images.length - 1 : n
  }, 0)
  modalImage.src = images[currentIndx - 1].src
}

function closeModal() {
  modal.style.display = 'none'
  document.body.style.overflow = ''
}

function modalToggle(e) {
  let windowHeight = window.innerHeight
  modal.style.display = 'block'
  modalContent.innerHTML = `<img src="${e.target.src}" id="modal-image">`
  document.body.style.overflow = 'hidden'
}
