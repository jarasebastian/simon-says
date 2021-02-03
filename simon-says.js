/*
    This is a .js file for the game logic
*/

// The html buttons are declared into the next constants
const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const startButton = document.getElementById('startButton')
const LAST_LEVEL = 5

// The main game class is declared
class Game {

    constructor() {
        this.initialize = this.initialize.bind(this)
        this.initialize()
        this.generateSecuence()
        setTimeout(this.nextLevel, 500)
    }

    // This method initiates or reset the values using during the game
    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.choiceColor = this.choiceColor.bind(this)
        this.toggleStartButton()
        this.level = 1
        this.colors = {
            lightBlue,
            violet,
            orange,
            green
        }
    }

    // Show or hide the start button
    toggleStartButton() {
        if (startButton.classList.contains('hide')) {
            startButton.classList.remove('hide')
        } else {
            startButton.classList.add('hide')
        }
      }

    // Method which generates the initial secuence for the game 
    generateSecuence() {
        this.secuence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    // Initializes a new level
    nextLevel() {
        this.levelUp = 0
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

    transformColorToNumber(color) {
        switch (color) {
            case 'lightBlue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
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

    removeClickEvents() {
        this.colors.lightBlue.removeEventListener('click', this.choiceColor)
        this.colors.green.removeEventListener('click', this.choiceColor)
        this.colors.violet.removeEventListener('click', this.choiceColor)
        this.colors.orange.removeEventListener('click', this.choiceColor)
    }

    // Method executed when the player choices a color for its validation
    choiceColor(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        this.lightUpColor(colorName)
        if (colorNumber === this.secuence[this.levelUp]) {
            this.levelUp++
            if (this.levelUp === this.level) {
                this.level++
                this.removeClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.wonGame()
                } else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            this.lostGame()
        }
    }

    wonGame() {
        swal('Simon Says', 'Congratulations, you won the game!', 'success')
            .then(this.initialize)
    }

    lostGame() {
        swal('Simon Says', 'Sorry, you lost :(', 'error')
            .then(() => {
                this.removeClickEvents()
                this.initialize()
            })
    }

}

// global function to start the game
function startGame() {
    window.game = new Game()
}