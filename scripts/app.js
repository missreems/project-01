// VARIABLE NAMES------------------------------------------------------------
const width = 10
let cells = []

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
    console.log(aliens1)
    console.log(playerBullet)
    console.log(aliens1.includes(playerBullet))
    if (playerBullet > 10) {
      // console.log(playerIdx)
      // console.log(playerBullet)
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
  
  // aliens1.forEach((alien, i) => {
  //   cells[alien].classList.add('alien')
  //   const aliens1Moving = setInterval(() => {
  //     cells[alien].classList.remove('alien')
  //     alien += 1
      
  //     if (i === 4) {
  //       checkFour(alien)
  //     }

  //     if (alien >= 80) {
  //       clearInterval(aliens1Moving)
  //       console.log('end of game')
  //       grid.style.backgroundColor = 'grey'
  //     }

  //     if (alien === playerBullet) {
  //       cells[alien].classList.remove('alien')
  //       cells[alien].classList.remove('bullet')
  //       console.log('alien shot')
  //       console.log(alien)
  //     }
    
  //     cells[alien].classList.add('alien')
  //   }, 300)

    
  // })

  const aliens1Moving = () => {
    cells.forEach(cell => cell.classList.remove('alien'))
    aliens1.forEach((alien, i) => {
      // alien += 1
      if (i === 4) {
        checkFour(alien)
      }
      if (alien >= 80) {
        clearInterval(aliens1Moving)
        console.log('end of game')
        grid.style.backgroundColor = 'grey'
      }
      // console.log(alien)
      // if (alien === playerBullet) {
      //   cells[alien].classList.remove('alien')
      //   cells[alien].classList.remove('bullet')
      //   console.log('alien shot')
      // }
    
      cells[alien].classList.add('alien')
    })
    aliens1 = aliens1.map(alien => alien + 1)
  }

  // const aliens1Moving = setInterval(aliensMoving)



  

  // ALIENS 2
  function moveSecondWave() {
    const aliens2Moving = () => {
      cells.forEach(cell => cell.classList.remove('alien'))
      aliens1.forEach((alien, i) => {
      
        if (alien >= 80) {
          clearInterval(aliens1Moving)
          console.log('end of game')
          grid.style.backgroundColor = 'grey'
        }
      
        cells[alien].classList.add('alien')
      })
      aliens2 = aliens2.map(alien => alien + 1)
    }
  
    
    // aliens2.forEach(alien => {
    //   cells[alien].classList.add('alien')
  
    //   const aliens2Moving = setInterval(() => {
    //     cells[alien].classList.remove('alien')
    //     alien += 1
  
    //     if (alien >= 80) {
    //       clearInterval(aliens2Moving)
    //       console.log('end of game')
    //       grid.style.backgroundColor = 'grey'
    //     }

    //     if (alien === playerBullet) {
    //       cells[alien].classList.remove('alien')
    //       cells[alien].classList.remove('bullet')
    //       console.log('alien shot')
    //       console.log(alien)
    //     }

    //     cells[alien].classList.add('alien')
    //   }, 300)
    // })
  }
  
})