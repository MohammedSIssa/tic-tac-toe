let playerTurn = 0
let gameFinished = false
let gameData = [
  "0", "1", "2",
  "3", "4", "5",
  "6", "7", "8"
]

let moves = 0
let winner = "Draw"
// let winningIdx = 0

let winningCombinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6]
]
const buttons = document.querySelectorAll('button')
let playerIndicator = document.querySelector('.x-o')
let info = document.querySelector('.player-turn')

// buttons[0].className = "glowing"

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (playerTurn == 0 && !gameFinished){
      moves++
      playerTurn = 1
      button.textContent = "X"
      button.className = "selected"
      button.style.color = "green"
      button.style.border = "3px double green"
      button.style.backgroundColor = "rgba(44, 230, 44, 0.3)"
      playerIndicator.innerHTML = "O"
      playerIndicator.style.color = "crimson"
      checkForWinner()
    }
    else if (playerTurn == 1 && !gameFinished){
      moves++
      playerTurn = 0
      button.textContent = "O"
      button.style.color = "crimson"
      button.className = "selected"
      button.style.border = "3px double crimson"
      button.style.backgroundColor = "rgba(230, 44, 44, 0.3)"
      playerIndicator.innerHTML = "X"
      playerIndicator.style.color = "green"
      checkForWinner()
    }
  })
})

function checkForWinner(){
  updateGameData()
  checkCombinations(winningCombinations)
  checkDraw(moves)
}

function updateGameData(){
  for(let i = 0; i < gameData.length; i++){
    gameData[i] = document.querySelectorAll('button')[i].textContent
  }
  console.log(gameData)
}

function checkCombinations(combs){
  for (let i = 0; i < combs.length; i++){
    if(isArrEqual(combs[i], gameData)){
      console.log(i, combs[i])
      animateWinner(3, combs[i])
      console.log('We should have a winner!')
      gameFinished = true
      console.log(winner);
      createPlayAgainButton()
      break
    }
  }
}

function isArrEqual(indices, data){
  let firstElement = data[indices[0]]
  for(let i = 0; i < indices.length; i++){
    if(firstElement !== data[indices[i]]){
      return false
    }
  }
  winner = firstElement
  info.innerHTML = `<div class="player">Player "<span class="${winner}">${winner}</span>" is the winner</div>`
  return true
}

function testing(indices, data){
  return [data[indices[0]], data[indices[1]], data[indices[2]]]
}

function checkDraw(moves){
  if(+moves === 9 && !gameFinished){
    console.log("Draw!")
    gameFinished = true
    info.innerHTML = `Draw`
    createPlayAgainButton()
  }
}

function createPlayAgainButton(){
  bgChange(winner)
  info.innerHTML += 
  `
  <div>
    <button class="play-again">Play Again</button>
  </div>
  `
  document.querySelector('.play-again').addEventListener('click', playAgain)
}

function playAgain(){
  location.reload()
}

function bgChange(winner){
  if(winner === "X"){
    document.body.style.backgroundColor = "rgba(23, 222, 23, 0.24)" // X won
  }
  else if(winner === "O"){
    document.body.style.backgroundColor = "rgba(222, 23, 23, 0.13)" // O won
  }
  else {
    document.body.style.backgroundColor = "rgba(123, 123, 123, 0.15)" // Draw
  }
}

function animateWinner(n, comb){
  for(let i = 0; i < n; i++){
    buttons[comb[i]].className = "glowing"
  }
}