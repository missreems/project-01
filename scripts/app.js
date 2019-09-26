// VARIABLE NAMES------------------------------------------------------------
const width = 10
const cells = []

let playerIdx = 95
let playerBullet = playerIdx - width

let aliens1 = [4, 13, 15, 22, 26]
let aliens2 = [1, 12, 3]
let firstWave = false
let aliens2Moving
let aliens1Moving
// let result = document.querySelector('.result')


function handleUserInput(keyCode) {
  switch (keyCode) {
    case 37: if (playerIdx % width > 0) playerIdx -= 1
      break
    case 39: if (Math.floor(playerIdx % width < width - 1)) playerIdx += 1
      break
    case 86: spaceBar()
      break
  }
}

function spaceBar() {
  
  const bulletMoving = setInterval(() => {
    cells[playerBullet].classList.remove('bullet')
    if (cells[playerBullet].classList.contains('alien')) {
      aliens1 = aliens1.map(alien => {
        if (!alien) return null
        
        console.log(playerBullet, 'bullet')
        console.log(alien, 'alien')

        if (playerBullet + 1 === alien) {
          
          
          console.log(cells[playerBullet - width].classList)
          cells[playerBullet - width].classList[0] = ''
          console.log(cells[playerBullet - width].classList)
          
          clearInterval(bulletMoving)
          //  Code from Olly
          //  if (cells[laserIdx].classList.contains(‘alien’)) {
          //   cells[laserIdx].classList.remove(‘alien’, ‘laser’)
        
          // cells[playerBullet].classList.remove('bullet')
          // clearInterval(bulletMoving)
          return null
        }
        return alien
      })
    }

    

    if (playerBullet > 10) {
      playerBullet -= width
      cells[playerBullet].classList.add('bullet')
    } else {
      cells[playerBullet].classList.remove('bullet')
      clearInterval(bulletMoving)
    }
  }, 300)

  cells[playerBullet].classList.remove('bullet')
  playerBullet = playerIdx - width
}
 
// WINNING CONDITION ------------------------------------------------------------
aliens1.every(alien => {
  if (alien === null) alert('You win!')
})


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
    cells[playerIdx].classList.remove('player')
    handleUserInput(e.keyCode)
    cells[playerIdx].classList.add('player')
  })


  // ALIENS 1 MOVEMENT PATTERN------------------------------------------------------------
  function checkFour (alien) {
    if (!firstWave && alien === 70) {
      moveSecondWave()
      firstWave = true
    }
  }

  aliens1Moving = setInterval(() => {
    cells.forEach(cell => cell.classList.remove('alien'))
    aliens1.forEach((alien, i) => {
      if (i === 4) {
        checkFour(alien)
      }
      if (alien >= 81) {
        clearInterval(aliens1Moving)
        clearInterval(aliens2Moving)
        console.log('you lose!')
        // result.textContent = 'YOU LOSE!'
        cells.forEach(cell => cell.classList.remove('alien'))
        cells[playerIdx].classList.remove('player')
      }
      if (alien) {
        cells[alien].classList.add('alien')
      }
    })
    aliens1 = aliens1.map(alien => {
      if (!alien) return null
      return alien + 1
    })
  }, 500)


  // ALIENS 2 MOVEMENT PATTERN------------------------------------------------------------
  function moveSecondWave() {
    cells.forEach(cell => cell.classList.remove('alien'))
    aliens2Moving = setInterval(() => {
      aliens2.forEach((alien) => {
        if (alien >= 81) {
          clearInterval(aliens1Moving)
          clearInterval(aliens2Moving)
          console.log('you lose!')
          // result.textContent = 'YOU LOSE!'
          cells.forEach(cell => cell.classList.remove('alien'))
          cells[playerIdx].classList.remove('player') 
        }
        if (alien) {
          cells[alien].classList.add('alien')
        }
      })
      aliens2 = aliens2.map(alien => {
        if (!alien) return null
        return alien + 1
      })
    }, 500)
  }
})