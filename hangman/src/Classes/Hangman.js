import View from "./View.js";


class Hangman2 extends View 
{
    constructor(data) {
        super();
        this.guessWords = data;
        this.totalGuesses = 6;
        this.playedWordNum = [];
        this.currentWord = this.guessWords[this.getRandomWord()];

        this.keyboardEvent;
        this.virtualKeyboardEvent;
        
        this.pressedLetters = [];
        
        this.gameScore =   
        {
            'wins': 0,
            'losses': 0,
            'gameWin': false,
        };
        
        this.correctLetters = 0;
        this.incorrectLetters = 0;
        

    }

    getRandomWord() {
        const guessWordsLength = this.guessWords.length;
        let count = 0;
        let randomInt = Math.floor(Math.random() * guessWordsLength);

        while (this.playedWordNum.includes(randomInt) && count <= guessWordsLength) {
            randomInt = Math.floor(Math.random() * guessWordsLength);
            count += 1;
            if (count >= guessWordsLength) {
                this.playedWordNum = [];
            }
        }
        this.playedWordNum.push(randomInt);

        return randomInt;
    }

    checkAnswer(key) {
        const counterContainer = document.querySelector(".questions-guess-counter-int");

        const answer = this.currentWord.word.toLowerCase();
        let currentLetters = answer.split('');

        let letterFound = false;
        this.pressedLetters.push(key);

        // Disable keys on virtual keyboard
        const keyContainer = document.querySelector(`#${key}`);
        keyContainer.classList.add("questions-guess-keyboard-char-disabled");
        
        
        for (let i = 0; i < currentLetters.length; i += 1) {
            if (currentLetters[i] === key.toLowerCase()) {
                this.showGuessLetter(i, currentLetters[i]);
                this.correctLetters += 1;
                letterFound = true;
            }
        }
        
        if (letterFound === false && this.incorrectLetters <= this.totalGuesses) {
            this.incorrectLetters += 1;
            counterContainer.innerHTML = this.incorrectLetters;
        }

        if (this.incorrectLetters === 1) {
            document.querySelector('.questions-guess-counter-int').classList.add("questions-guess-counter-int-wrong");
            
        }

        if (this.incorrectLetters > 0 && this.incorrectLetters <= this.totalGuesses) {
            const bodyPart = document.querySelector(`#body-part-${this.incorrectLetters}`);
            bodyPart.setAttribute("opacity", "1");

            if (this.incorrectLetters >= this.totalGuesses) {
                this.gameScore.losses += 1;
                this.gameScore.gameWin = false;

                this.gameEnd();
            }
        }

        if (this.correctLetters === answer.length) {
            this.gameScore.wins += 1;
            this.gameScore.gameWin = true;

            this.gameEnd();
        }

    }

    showGuessLetter(index, letter) {
        const letterContainer = document.querySelector(`#quess-letter-${index}`);
        letterContainer.innerHTML = letter;
    }


    showLog() {
        console.log('Word: ', this.currentWord.word);
    }

    addEvents() {
       
        // Event for keyboard
        document.addEventListener("keyup", this.keyboardEvent = (e) => {
            if (e.key.match(/^[a-zA-Z]+$/i) && e.key.length === 1 && !this.pressedLetters.includes(e.key)) {
                this.checkAnswer(e.key.toLocaleLowerCase());
            } else {
                console.log('Not a letter');
            }
        });

        // Event for virtual keyboard
        const guessKeyboard = document.querySelectorAll(".questions-guess-keyboard-char");
        guessKeyboard.forEach((keyboardChar) => {
            keyboardChar.addEventListener("click", this.virtualKeyboardEvent = (e) => {
                if (!this.pressedLetters.includes(keyboardChar.innerHTML.toLocaleLowerCase()) 
                    && this.incorrectLetters <= this.totalGuesses ) {
                    this.checkAnswer(keyboardChar.innerHTML.toLocaleLowerCase());
                }
            });
        });

    }

    gameContinue() {
        // reset game variables
        this.pressedLetters = [];
        this.correctLetters = 0;
        this.incorrectLetters = 0;
        this.currentWord = this.guessWords[this.getRandomWord()];

        // render game
        this.renderMain();

        // add keyboard eventListener
        this.addEvents();
        this.showLog();
    }

    gameEnd() {
        // Remove EventListeners
        document.removeEventListener("keyup", this.keyboardEvent);
        document.removeEventListener("click", this.virtualKeyboardEvent);
        
        // Gallows end game animation
        const bodyParts = document.querySelectorAll(".gallows-hangman");
        if (this.gameScore.gameWin === false) {
            bodyParts[0].setAttribute("transform", "translate(230, 700) scale(0.08,-0.08)");
            bodyParts[1].setAttribute("transform", "translate(550,500) rotate(90)");
            bodyParts[2].setAttribute("transform", "translate(200 650) rotate(60) scale(0.06,-0.06)");
            bodyParts[3].setAttribute("transform", "translate(180 680) rotate(-60) scale(0.06,-0.06)");
            bodyParts[4].setAttribute("transform", "translate(220 630) rotate(70) scale(0.06,-0.06)");
            bodyParts[5].setAttribute("transform", "translate(180 690) rotate(-70) scale(0.06,-0.06)");    
        } 

        // Render modal
        this.renderModal(this.gameScore);
        const modalBox = document.querySelector(".modal-container-box");
        setTimeout(() => {
            modalBox.classList.add("modal-container-box-open");
        }, 400);

    }


    start() {
        this.renderStart();
        this.showLog();
    }
}

export default Hangman2;