const flexContainer = document.querySelector('.flex-container'),
  modal = document.querySelector('.my-modal'),
  modalContent = document.querySelector('.my-modal-content'),
  next = document.getElementById('next'),
  prev = document.getElementById('prev')
let images

const getImages = async url => {
  const response = await fetch(url),
    data = await response.json()
  return data
}

getImages('images.json').then(i => {
  images = i
  flexContainer.innerHTML = i.reduce((str, x) => str += `<img src="${x}"/>`, '')
  Array.from(document.querySelectorAll('img')).forEach(x => x.addEventListener('click', modalToggle))
}).catch(err => console.log(err))

modal.addEventListener('click', x => x.target.classList.contains('my-modal-content') ? closeModal() : false)
next.addEventListener('click', () => changeImg(+1))
prev.addEventListener('click', () => changeImg(-1))
document.getElementById('close').addEventListener('click', closeModal)
document.addEventListener('keydown', e => {
  if (modal.style.display === 'block') {
    if (e.keyCode === 27) {
      closeModal()
    }
    else if (e.keyCode === 37) {
      changeImg(-1)
      prev.focus()
      setTimeout(()=> prev.blur(),300)
    }
    else if (e.keyCode === 39) {
      next.focus()
      changeImg(+1)
      setTimeout(()=> next.blur(),300)
    }
  }
})

const changeImg = val => {
  let modalImage = document.getElementById('modal-image'),
    currentIndx = images.indexOf(modalImage.src)
  const switchImage = nextImg => {
    modalImage.classList.add('animated', 'fadeOut')
    setTimeout(() => {
      modalImage.classList.remove('animated', 'fadeOut')
      modalImage.src = nextImg
      modalImage.classList.add('animated', 'fadeIn')
    }, 500)
  }
  if (currentIndx === 0 && val === -1) {
    switchImage(images[images.length - 1])
  }
  else if (currentIndx === images.length - 1 && val === +1) {
    switchImage(images[0])
  }
  else {
    switchImage(images[currentIndx + val])
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