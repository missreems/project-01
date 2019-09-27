// VARIABLE NAMES------------------------------------------------------------
const width = 10
const cells = []

let playerIdx = 95
let playerBullet = playerIdx - width

let aliens1 = [4, 13, 15, 22, 26, 31, 37, 40, 48]
// let aliens2 = [1, 12, 3]
// let firstWave = false
let aliens2Moving
let aliens1Moving
// let result = document.querySelector('.result')









// LOAD DOM------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  const welcomePage = document.querySelector('.welcomePage')
  welcomePage.classList.add('welcomePage')
  const start = document.querySelector('.startButton')

  const grid = document.querySelector('.grid')

  grid.classList.add('hide')

  const winningText = document.querySelector('.winning-text')
  winningText.classList.add('hide')
  const losingText = document.querySelector('.losing-text')
  losingText.classList.add('hide')
  
  const resetButtons = document.querySelectorAll('.reset')
  const winReset = document.querySelector('.winReset')
  winReset.classList.add('hide')
  const loseReset = document.querySelector('.loseReset')
  loseReset.classList.add('hide')


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

  // WELCOME PAGE ------------------------------------------------------------
  start.addEventListener('click', () => {
    console.log('hello start')
    aliensStartMoving()
    
    // welcomePage.classList.remove('welcomePage')
    welcomePage.style.display = 'none'
    grid.classList.remove('hide')
  })
  // after loading, a couple of minutes later the lose page comes up!!!
  
  // WINNING CONDITION ------------------------------------------------------------
  function win() {
    if (!aliens1.length) {
      // console.log('you win!')
      grid.classList.replace('grid', 'hide')
      winningText.classList.remove('hide')
      winningText.classList.add('.winning-text')
      winReset.classList.remove('hide')
      winReset.classList.add('.winReset')
    }
  }

  // LOSING CONDITION ------------------------------------------------------------
  function lose() {
    // console.log('you lose!')
    grid.classList.replace('grid', 'hide')
    losingText.classList.remove('hide')
    losingText.classList.add('.losing-text')
    loseReset.classList.remove('hide')
    loseReset.classList.add('.loseReset')
    
  }

  // RESET BUTTON ------------------------------------------------------------
  resetButtons.forEach(button => {
    button.addEventListener('click', () => {
      location.reload()
    })
  })


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

  function spaceBar() {
    cells[playerBullet].classList.add('bullet')
  
    const bulletMoving = setInterval(() => {
      cells[playerBullet].classList.remove('bullet')
  
      if (playerBullet > 10 && !cells[playerBullet].classList.contains('alien')) {
        playerBullet -= width
        cells[playerBullet].classList.add('bullet')
      } else {
        aliens1 = aliens1.filter(alien => {
          return alien !== playerBullet + 1
        })
        cells[playerBullet].classList.remove('bullet', 'alien')
        cells[playerBullet].classList.add('explosion')
        setTimeout(() => {
          cells[playerBullet].classList.remove('explosion')
        }, 300)
        clearInterval(bulletMoving)
        win()
      }
    }, 100)
  
    cells[playerBullet].classList.remove('bullet')
    playerBullet = playerIdx - width
  }

  // ALIENS 1 MOVEMENT PATTERN------------------------------------------------------------
  // function checkFour (alien) {
  //   if (!firstWave && alien === 50) {
  //     moveSecondWave()
  //     firstWave = true
  //   }
  // }
  function aliensStartMoving () {
    aliens1Moving = setInterval(() => {
      cells.forEach(cell => cell.classList.remove('alien'))
      aliens1.forEach((alien) => {
        // if (i === 4) {
        //   checkFour(alien)
        // }
        if (alien >= 81) {
          clearInterval(aliens1Moving)
          clearInterval(aliens2Moving)
          lose()
          console.log('you lose')
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
    }, 350)
  }
  


  // ALIENS 2 MOVEMENT PATTERN------------------------------------------------------------
  // function moveSecondWave() {
  //   cells.forEach(cell => cell.classList.remove('alien'))
  //   aliens2Moving = setInterval(() => {
  //     aliens2.forEach((alien) => {
  //       if (alien >= 81) {
  //         clearInterval(aliens1Moving)
  //         clearInterval(aliens2Moving)
  //         console.log('you lose!')
  //         // result.textContent = 'YOU LOSE!'
  //         cells.forEach(cell => cell.classList.remove('alien'))
  //         cells[playerIdx].classList.remove('player') 
  //       }
  //       if (alien) {
  //         cells[alien].classList.add('alien')
  //       }
  //     })
  //     aliens2 = aliens2.map(alien => {
  //       if (!alien) return null
  //       return alien + 1
  //     })
  //   }, 500)
  // }
})