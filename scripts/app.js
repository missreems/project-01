// VARIABLE NAMES------------------------------------------------------------
const width = 10
const cells = []
let direction = 1

let playerIdx = 95
const aliens = [1, 3, 5, 7]
let playerBullet = playerIdx - width
// const alienBullets = aliens.map(alien => {
//   alien + width
//   // console.log(alien + width)
// }) 


function handleUserInput(keyCode) {
  switch (keyCode) {
    case 37: if (playerIdx % width > 0) playerIdx -= 1
      break
    case 39: if (Math.floor(playerIdx % width < width - 1)) playerIdx += 1
      break
    case 32: spaceBar()
      break
  }
}


function alienMovement() {
  aliens.forEach(alien => {
    
    alien += direction
  
    const x = Math.floor(alien % width)

    if (direction === 1) {
      direction = 1
    } else if (direction === width && x === width - 1) {
      direction = -1
    } else if (direction === -1 && x === 0) {
      direction = width
    } else if (direction === width && x === 0) {
      direction = 1
    } 
  })
  
}
function spaceBar() {
  cells[playerBullet].classList.add('bullet')
  const bulletMoving = setInterval(() => {
    cells[playerBullet].classList.remove('bullet')
    if (playerBullet > 10) {
      // console.log(playerIdx)
      console.log(playerBullet)
      playerBullet -= width
      collision()
      cells[playerBullet].classList.add('bullet')
    } else {
      cells[playerBullet].classList.remove('bullet')
      clearInterval(bulletMoving)
    }
  }, 100)
  cells[playerBullet].classList.remove('bullet')
  playerBullet = playerIdx - width
}

// COLLISION - YOU LOSE!------------------------------------------------------------
// player shoots alien
// alien shoots player
// player's bullet and alien's bullet clashes - should cancel out
function collision() {
  // aliens.forEach(alien => {
  //   if (alien[alienBullet] === playerIdx) {
  //     console.log('end of game')
  //   }
  // })
  aliens.forEach(alien => {
    if (playerBullet === alien) {
      console.log('alien shot')
    }
  })
}
  


// LOAD DOM------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')


  // GRID WITH CELLS------------------------------------------------------------
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // EVENTLISTENER FOR MOVEMENT OF PLAYER------------------------------------------------------------
  cells[playerIdx].classList.add('player')
  document.addEventListener('keyup', (e) => {
    // console.log('works')
    cells[playerIdx].classList.remove('player')
    handleUserInput(e.keyCode)
    cells[playerIdx].classList.add('player')
  })

  
  // ALIEN MOVEMENT PATTERN------------------------------------------------------------

  aliens.forEach(alien => {
    cells[alien].classList.add('alien')
    const alienSetInterval = setInterval(() => {
      cells[alien].classList.remove('alien')
      alienMovement()
      // ALIEN REACHES BOTTOM OF SCREEN - YOU LOSE!
      //change 79 - make flexible for all grid sizes
      if (alien > 79) {
        clearInterval(alienSetInterval)
        console.log('end of game')
      }
      cells[alien].classList.add('alien')
    }, 500)
  })



  // ALIEN SHOOTS A BULLET------------------------------------------------------------
  aliens.forEach(alienBullet => {
    // cells[Math.floor(Math.random() * cells.length)] - finds random cell within cells
    cells[alienBullet].classList.add('alienBullet')
    const alienBulletMoving = setInterval(() => {
      cells[alienBullet].classList.remove('alienBullet')
      if (alienBullet < 89) {
        console.log(alienBullet)
        alienBullet += width
        collision()
        cells[alienBullet].classList.add('alienBullet')
      } else {
        cells[alienBullet].classList.remove('alienBullet')
        clearInterval(alienBulletMoving)
      }
    }, 500)
  }) 
})