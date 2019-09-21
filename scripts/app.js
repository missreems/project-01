// variable names
const width = 10
const cells = []
let playerIndex = 95
let direction = 1
let alienIndex = 2
let bulletIndex = playerIndex
let alienBulletIndex = alienIndex + width


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


function spaceBar () {
  const bulletMoving = setInterval(() => {
    cells[bulletIndex].classList.remove('bullet')
    if (bulletIndex > 10) {
      bulletIndex -= width
      cells[bulletIndex].classList.add('bullet')
    } else {
      cells[bulletIndex].classList.remove('bullet')
      clearInterval(bulletMoving)
    }
  }, 500)
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
  const alienSetInterval = setInterval(() => {
    cells[alienIndex].classList.remove('alien')    
    alienMovement()
    // ALIEN REACHES BOTTOM OF SCREEN - YOU LOSE!
    //change 79 - make flexible for all grid sizes
    if (alienIndex > 79) {
      clearInterval(alienSetInterval)
      console.log('end of game')
    }
    cells[alienIndex].classList.add('alien')
  }, 500)


  // Player shoots bullets - spacebar
  document.addEventListener('keyup', (e) => {
    spaceBar(e.keyCode)
  })

  // Alien shoots bullets
  cells[alienBulletIndex].classList.add('alienBullet')
  const alienBulletMoving = setInterval(() => {
    cells[alienBulletIndex].classList.remove('alienBullet')
    if (alienBulletIndex < 89) {
      alienBulletIndex += width
      cells[alienBulletIndex].classList.add('alienBullet')
    } else {
      cells[alienBulletIndex].classList.remove('alienBullet')
      clearInterval(alienBulletMoving)
    }
  }, 500)
  

  // ALIEN SHOOTS PLAYER - YOU LOSE!
  function collision () {
    if (alienBulletIndex === playerIndex) {
      console.log('collision')
    }
  }

  collision()

})