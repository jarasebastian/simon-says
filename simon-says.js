/*
    This is a .js file for the game logic
*/

// The html buttons are declared into the next constants
const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const startButton = document.getElementById('startButton')

// The main game class is declared
class Game {

    constructor() {
        this.initialize()
    }

    initialize() {
        startButton.classList.add('hide')
    }

}

// global function to start the game
function startGame() {
    var game = new Game()
}