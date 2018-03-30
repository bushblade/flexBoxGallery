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
  images = i
  i.forEach(x => flexContainer.innerHTML += `<img src="${x}" alt="" />`)
  Array.from(document.querySelectorAll('img')).forEach(x => x.addEventListener('click', modalToggle))
})

modal.addEventListener('click', x => x.target.classList.contains('my-modal-content') ? closeModal() : false)
document.getElementById('next').addEventListener('click', () => changeImg(+1))
document.getElementById('prev').addEventListener('click', () => changeImg(-1))
document.addEventListener('keydown', e => {
  if (modal.style.display === 'block') {
    e.keyCode === 27 ? closeModal() : false
    e.keyCode === 37 ? changeImg(-1) : false
    e.keyCode === 39 ? changeImg(+1) : false
  }
})


function changeImg(val) {
  let modalImage = document.getElementById('modal-image')
  let currentIndx = images.indexOf(modalImage.src)
  if (currentIndx === 0 && val === -1) {
    modalImage.classList.add('animated', 'fadeOut')
    setTimeout(() => {
      modalImage.classList.remove('animated', 'fadeOut')
      modalImage.src = images[images.length - 1]
      modalImage.classList.add('animated', 'fadeIn')
    }, 500)
  }
  else if (currentIndx === images.length - 1 && val === +1) {
    modalImage.classList.add('animated', 'fadeOut')
    setTimeout(() => {
      modalImage.classList.remove('animated', 'fadeOut')
      modalImage.src = images[0]
      modalImage.classList.add('animated', 'fadeIn')
    }, 500)
  }
  else {
    modalImage.classList.add('animated', 'fadeOut')
    setTimeout(() => {
      modalImage.classList.remove('animated', 'fadeOut')
      modalImage.src = images[currentIndx + val]
      modalImage.classList.add('animated', 'fadeIn')
    }, 500)
  }
}

function closeModal() {
  modal.classList.add('animated', 'fadeOut')
  document.body.style.overflow = ''
  setTimeout(() => {
    modal.classList.remove('animated', 'fadeOut')
    modal.style.display = 'none'
  }, 500)
}

function modalToggle(e) {
  modal.classList.add('animated', 'fadeIn')
  modal.style.display = 'block'
  modalContent.innerHTML = `<img src="${e.target.src}" id="modal-image">`
  document.body.style.overflow = 'hidden'
  setTimeout(() => modal.classList.remove('animated', 'fadeIn'), 400)
}