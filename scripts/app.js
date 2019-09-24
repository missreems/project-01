// VARIABLE NAMES------------------------------------------------------------
const width = 10
const cells = []

let playerIdx = 95
let playerBullet = playerIdx - width

let aliens1 = [4, 13, 15, 22, 26]
let aliens2 = [0, 11, 2]
let firstWave = false



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
function collision() {
  // ALIENS 1
  // if (cells.classList.includes(alien) && cells.classList.includes(bullet)) {
  //   console.log('shot alien1')
  // }
  aliens1.forEach(alien => {
    if (playerBullet === alien) {
      console.log('alien 1 shot')
    }
  })

  // ALIENS 2
  aliens2.forEach(alien => {
    if (playerBullet === alien) {
      console.log('alien 2 shot')
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

  
  // ALIENS MOVEMENT PATTERN------------------------------------------------------------
  // ALIENS 1

  function checkFour (alien) {
    if (!firstWave && alien === 70) {
      console.log('should start second wave now')
      moveSecondWave()
    }
  }
  
  aliens1.forEach((alien, i) => {
    cells[alien].classList.add('alien')

    const aliens1Moving = setInterval(() => {
      cells[alien].classList.remove('alien')
      alien += 1
      
      if (i === 4) {
        checkFour(alien)
      }

      if (alien > 79) {
        clearInterval(aliens1Moving)
        console.log('end of game')
      }
      cells[alien].classList.add('alien')
    }, 300)
  })

  

  // ALIENS 2
  function moveSecondWave() {
    aliens2.forEach(alien => {
      cells[alien].classList.add('alien')
  
      const aliens2Moving = setInterval(() => {
        cells[alien].classList.remove('alien')
        alien += 1
  
        // ALIEN REACHES BOTTOM OF SCREEN - YOU LOSE!
        if (alien > 79) {
          clearInterval(aliens2Moving)
          console.log('end of game')
        }
        cells[alien].classList.add('alien')
      }, 300)
    })
  }
  
})