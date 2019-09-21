let playerIndex = 95
let direction = 1
const width = 10
const cells = []
let alienIndex = 1

function spaceBar () {
  const spaceBar = setInterval(() => {
    console.log('shoot')
  }, 500)
  setTimeout(() => {
    clearInterval(spaceBar)    
  }, 5000)
}
function handleUserInput(keyCode) {
  switch (keyCode) {
    case 37: if (playerIndex % width > 0) playerIndex -= 1
      break
    case 39: if (Math.floor(playerIndex % width < width - 1)) playerIndex += 1
      break
    case 32: spaceBar()
      break    
  }
}
function alienMovement () {
  alienIndex += direction
  const x = Math.floor(alienIndex % width)
  if (direction === 1 && x === width - 1) {
    direction = width
  } else if (direction === width && x === width - 1) {
    direction = -1
  } else if (direction === -1 && x === 0) {
    direction = width
  } else if (direction === width && x === 0) {
    direction = 1
  }
}


// Load DOM
window.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  
  // grid with cells - added 'cell' to the array 'cells'
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // EventListener for movement of Player - arrow keys
  cells[playerIndex].classList.add('player')
  document.addEventListener('keydown', (e) => {
    // console.log('works')
    cells[playerIndex].classList.remove('player')
    handleUserInput(e.keyCode)
    cells[playerIndex].classList.add('player')
  })

  // Set Interval for Alien
  cells[alienIndex].classList.add('alien')
  setInterval(() => {
    cells[alienIndex].classList.remove('alien')    
    alienMovement()
    cells[alienIndex].classList.add('alien')
  }, 300)

  // // You lose - alien has reached
  // if (alienIndex === (width ** 2) - 1) {
  //   alert('You lose!')
  // }


  




})