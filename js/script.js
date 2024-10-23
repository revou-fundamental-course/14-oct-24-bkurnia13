// Get User Name
let userName = 'User'
userName = prompt('Please enter your name', '')

// Typing Text Effect in Jumbotron
let typed = new Typed('.running-text', {
  strings: [userName],
  typeSpeed: 25,
  backSpeed: 10,
  backDelay: 1000,
  startDelay: 250,
  loop: true,
})

// Image Slider
let imageIndex = 0
const leftButton = document.querySelector('.slider-button.left')
const rightButton = document.querySelector('.slider-button.right')
const imageList = document.querySelectorAll('.slider-image img')
const sliderIndicator = document.querySelector('.slider-indicator')

for (let i = 0; i < imageList.length; i++) {
  const sliderElement = document.createElement('div')
  sliderIndicator.appendChild(sliderElement)
}

function slideImage(n) {
  imageIndex += n

  if (imageIndex < 0) {
    imageIndex = 0
    return false
  }

  if (imageIndex > imageList.length - 1) {
    imageIndex = imageList.length - 1
    return false
  }

  if (imageIndex == 0) {
    leftButton.classList.remove('active')
  } else {
    leftButton.classList.add('active')
  }

  if (imageIndex == imageList.length - 1) {
    rightButton.classList.remove('active')
  } else {
    rightButton.classList.add('active')
  }

  for (let i = 0; i < imageList.length; i++) {
    imageList[i].style.transform = `translateX(${imageIndex * -100}%)`
  }

  const sliderIndicators = document.querySelectorAll('.slider-indicator div')

  for (let i = 0; i < sliderIndicators.length; i++) {
    sliderIndicators[i].classList.remove('active')
  }

  sliderIndicators[imageIndex].classList.add('active')
}

slideImage(2)

// Position of items in My Skill section
let grid = 3
let windowSize = window.innerWidth
const skills = document.querySelectorAll('#my-skill .card-body div')

function offsetElement(grid) {
  for (let i = 0; i < skills.length; i++) {
    let offset = (i % grid) * 50 + 50
    let duration = (i % grid) * 0.2 + 0.4

    skills[i].style.transform = `translateY(${offset + 'px'})`
    skills[i].style.transition = `all ${duration + 's'} ease-in-out`

    skills[i].addEventListener('mouseenter', (event) => {
      event.currentTarget.classList.remove('inactive')
      event.currentTarget.classList.add('active')
    })

    skills[i].addEventListener('mouseleave', (event) => {
      event.currentTarget.classList.remove('active')
      event.currentTarget.classList.add('inactive')
    })
  }
}

window.addEventListener('resize', function () {
  windowSize = this.window.innerWidth
  windowSize < 576 ? (grid = 2) : (grid = 3)
  offsetElement(grid)
})

window.addEventListener('load', function () {
  offsetElement(grid)
})

// Intersection Observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    } else {
      entry.target.classList.remove('visible')
    }
  })
}

const observer = new IntersectionObserver(handleIntersect, options)

// Target element to observe
const jumbotronLink = document.querySelector('.jumbotron a')
const mySkill = document.querySelector('#my-skill .card-body')
const portfolio = document.querySelector('#portfolio')

// Start observing the target element
observer.observe(jumbotronLink)
observer.observe(mySkill)
observer.observe(portfolio)

// Menu Button Mobile
const menu = document.querySelector('nav ul')
const menuIcon = document.querySelector('.mobile-menu-button i')
const menuButton = document.querySelector('.mobile-menu-button')

menuButton.addEventListener('click', function () {
  menu.classList.toggle('mobile-active')
  menuIcon.classList.toggle('mobile-active')
})

// Form Validation
const form = document.querySelector('form')

function formValidate(event) {
  event.preventDefault()

  const name = document.forms['contact-me']['name'].value
  const birthDate = document.forms['contact-me']['birth-date'].value
  const gender = document.forms['contact-me']['gender'].value
  const message = document.forms['contact-me']['message'].value

  const invalidName = document.querySelector('#invalid-name')
  const invalidBirthDate = document.querySelector('#invalid-birthdate')
  const invalidGender = document.querySelector('#invalid-gender')
  const invalidMessage = document.querySelector('#invalid-message')

  if (name == '') {
    invalidName.innerHTML = 'Please enter your name!'
    return false
  } else {
    invalidName.innerHTML = ''
  }

  if (birthDate == '') {
    invalidBirthDate.innerHTML = 'Please enter your birthdate!'
    return false
  } else {
    invalidBirthDate.innerHTML = ''
  }

  if (gender == '') {
    invalidGender.innerHTML = 'Please choose gender!'
    return false
  } else {
    invalidGender.innerHTML = ''
  }

  if (message == '') {
    invalidMessage.innerHTML = 'Please input your message!'
    return false
  } else {
    invalidMessage.innerHTML = ''
  }

  const data = {
    name,
    birthDate,
    gender,
    message,
  }

  document.forms['contact-me'].reset()

  showMessage(data)
}

// Show Validated Value
function showMessage(data) {
  const table = document.querySelector('.message table')
  const displayName = document.querySelector('#display-name')
  const displayBirthdate = document.querySelector('#display-birthdate')
  const displayGender = document.querySelector('#display-gender')
  const displayMessage = document.querySelector('#display-message')

  const { name, birthDate, gender, message } = data
  const date = Date.parse(birthDate)
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  table.style.display = 'block'
  displayName.innerHTML = name
  displayBirthdate.innerHTML = new Intl.DateTimeFormat('id-ID', dateOptions).format(date)
  displayGender.innerHTML = gender
  displayMessage.innerHTML = message
}

form.addEventListener('submit', formValidate)
