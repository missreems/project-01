// VARIABLE NAMES------------------------------------------------------------
const width = 10
const cells = []

let playerIdx = 95
let playerBullet = playerIdx - width

let jellies1 = [4, 13, 15, 22, 26, 31, 37, 40, 48]

let jellies2Moving
let jellies1Moving


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
    jelliesStartMoving()
    
    // welcomePage.classList.remove('welcomePage')
    welcomePage.style.display = 'none'
    grid.classList.remove('hide')
  })
  

  // WINNING CONDITION ------------------------------------------------------------
  function win() {
    if (!jellies1.length) {
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
  
      if (playerBullet > 10 && !cells[playerBullet].classList.contains('jelly')) {
        playerBullet -= width
        cells[playerBullet].classList.add('bullet')
      } else {
        jellies1 = jellies1.filter(jelly => {
          return jelly !== playerBullet + 1
        })
        cells[playerBullet].classList.remove('bullet', 'jelly')
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

  
  // JELLIES 1 MOVEMENT PATTERN------------------------------------------------------------
  function jelliesStartMoving () {
    jellies1Moving = setInterval(() => {
      cells.forEach(cell => cell.classList.remove('jelly'))
      jellies1.forEach((jelly) => {
        console.log(jelly)
        if (jelly >= 81) {
          clearInterval(jellies1Moving)
          clearInterval(jellies2Moving)
          lose()
          console.log('you lose')
          cells.forEach(cell => cell.classList.remove('jelly'))
          cells[playerIdx].classList.remove('player')
        }
        if (jelly) {
          cells[jelly].classList.add('jelly')
        }
      })
      jellies1 = jellies1.map(jelly => {
        if (!jelly) return null
        return jelly + 1
        
      })
    }, 350)
  }
})