var titleImg, rockImg, scissorImg, paperImg
var rock, scissor, paper, name, bg, resetButton
var dataBase
var gameState = 0
var playerCount = 0

function preload() {
  titleImg = loadImage("assets/RPS.png")
  rockImg = loadImage("assets/Rock.png")
  scissorImg = loadImage("assets/Scissors.png")
  paperImg = loadImage("assets/Paper.png")
  bg = loadImage("assets/bg.png")
  resetImg = loadImage("assets/reset.png")
}

function setup() {
  dataBase = firebase.database()
  getState()
  console.log(gameState)
  getPlayerCount()
  createCanvas(800, 600);
  if (gameState === 0) {
    showElements()
  }


}

function draw() {
  background("#13abb3")
  if (gameState === 1) {

    play()
  }

  if (playerCount === 2) {
    gameState = 1
    gameStateUpdate(1)
  }

}

function getState() {
  dataBase.ref("gameState").on("value", function (data) {
    gameState = data.val()
  })
}

function getPlayerCount() {
  dataBase.ref("playerCount").on("value", function (data) {
    playerCount = data.val()
  })
}
function showElements() {
  title = createImg("assets/RPS.png")
  title.position(width / 2 - 150, height / 2 - 200)
  input = createInput("").attribute("placeholder", "Enter your name")
  input.position(width / 2 - 100, height / 2 + 100)
  input.class("customInput")
  button = createButton("Play")
  button.position(width / 2 - 90, height / 2 + 200)
  button.class("customButton")
  playButtonPressed()
}
function playButtonPressed() {
  button.mousePressed(() => {
    playerCount += 1
    playerName = input.value()
    playerCountUpdate(playerCount, playerName)
    addPlayer()
    title.hide()
    input.hide()
    button.hide()
  })

}

function playerCountUpdate(count, name) {
  dataBase.ref("/").update({
    playerCount: count
  })
  var playerIndex = "players/player" + count
  console.log(playerIndex)
  dataBase.ref(playerIndex).set({
    name: name
  })
}

function gameStateUpdate(state) {
  dataBase.ref("/").update({
    gameState: state
  })
}

function handleResetButton() {
  resetButton.mousePressed(() => {
    dataBase.ref("/").set({
      playerCount: 0,
      gameState: 0,
      players: {}
    });
    window.location.reload();
  });
}

function addPlayer() {
  if (playerCount === 1) {
    p1 = createSprite(100, height / 2, 50, 50)
    p1.shapeColor = "green"
  }
  if (playerCount === 2) {
    p2 = createSprite(width - 100, height / 2, 50, 50)
    p1.shapeColor = "yellow"
  }

}

function createElements() {
  resetButton = createButton('Reset');
  resetButton.position(10, 10)
  rockButton = createButton("Rock")
  rockButton.position(width - 100, height - 50)
  rockButton.size(80, 40)
  rockButton.class("customButton2")
  paperButton = createButton("Paper")
  paperButton.position(width - 190, height - 50)
  paperButton.size(80, 40)
  paperButton.class("customButton2")
  scissorButton = createButton("Scissor")
  scissorButton.position(width - 280, height - 50)
  scissorButton.size(80, 40)
  scissorButton.class("customButton2")
}

function play() {
  drawSprites();
  createElements()
  handleResetButton()
}