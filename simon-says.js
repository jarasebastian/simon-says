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
        this.generateSecuence()
        this.nextLevel()
    }

    // This method initiates or reset the values using during the game
    initialize() {
        this.choiceColor = this.choiceColor.bind(this)
        startButton.classList.add('hide')
        this.level = 1
        this.colors = {
            lightBlue,
            violet,
            orange,
            green
        }
    }

    // Method which generates the initial secuence for the game 
    generateSecuence() {
        this.secuence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.lightUpSecuence()
        this.addClickEvents()
    }

    transformNumberToColor(number) {
        switch (number) {
            case 0:
            return 'lightBlue'
            case 1:
            return 'violet'
            case 2:
            return 'orange'
            case 3:
            return 'green'
        }
    }

    // Method which lights up the buttons according with the secuence generated
    lightUpSecuence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.secuence[i])
            setTimeout(() => this.lightUpColor(color), 1000 * i)
        }
    }

    lightUpColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.lightDownColor(color), 350)
    }

    lightDownColor(color) {
        this.colors[color].classList.remove('light')
    }

    addClickEvents() {
        this.colors.lightBlue.addEventListener('click', this.choiceColor)
        this.colors.green.addEventListener('click', this.choiceColor)
        this.colors.violet.addEventListener('click', this.choiceColor)
        this.colors.orange.addEventListener('click', this.choiceColor)
    }

    choiceColor(ev) {
        console.log(this)
    }

}

// global function to start the game
function startGame() {
    var game = new Game()
}