window.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 10
  const cells = []
  let playerIndex = 95
  let direction = 1
  // let bullet = playerIndex - width
  

  // create cells within the grid
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // movement of player - arrow keys(left & right)
  // player stops at wall
  cells[playerIndex].classList.add('player')
  document.addEventListener('keyup', (e) => {
    // console.log('works')
    cells[playerIndex].classList.remove('player')

    switch (e.keyCode) {
      case 37: if (playerIndex % width > 0) { 
        playerIndex -= 1
      }
        break
      case 39: if (Math.floor(playerIndex % width < width - 1)) playerIndex += 1
        break
    }
    cells[playerIndex].classList.add('player')
  })

  // setInterval(() => {
  //   bullet += 1
  //   cells[bullet].classList.add('bullet')
  // }, 500)


  let alienIndex = 1
  cells[alienIndex].classList.add('alien')
  setInterval(() => {
    // console.log('moves')
    cells[alienIndex].classList.remove('alien')    

    alienIndex += direction
    const x = Math.floor(alienIndex % width)

    if (direction === 1 && x === width - 1) {
      direction = width
    } else if (direction === width && x === width - 1) {
      direction = -1
    } else if (direction === -1 && x === 0) {
      direction = width
    }
    

    cells[alienIndex].classList.add('alien')
  }, 300)

  // // You lose - alien has reached
  // if (alienIndex === (width ** 2) - 1) {
  //   alert('You lose!')
  // }


  




})