import htmlTemplates from "./htmlTemplates.js";

class View extends htmlTemplates
{
    constructor() {
        super();
        this.container = document.querySelector("body");
        this.mainContainer;
        this.gallowsContainer;
        this.questionsContainer;
    }

    renderStart() {
        // Main Container
        this.mainContainer = document.createElement("div");
        this.mainContainer.classList.add("main-section-container");
        this.container.append(this.mainContainer);

        //Game Start box
        const startBoxContainer = document.createElement("div");
        startBoxContainer.classList.add("start-box");
        startBoxContainer.innerHTML = this.startBoxHTML;
        this.mainContainer.append(startBoxContainer);

        const startBtn = document.querySelector("#start-box-btn");
        startBtn.addEventListener("click", (e) => {
            startBoxContainer.remove();
            this.renderMain();
            this.addEvents();
        });
    }

    renderMain() {
        /**
         * GALLOWS SECTION
         */
        
        // Gallows Section Container
        this.gallowsContainer = document.createElement("div");
        this.gallowsContainer.classList.add("gallows-section-container");
        this.mainContainer.append(this.gallowsContainer);

        // Gallows SVG Container
        const gallowsSVGContainer = document.createElement("div");
        gallowsSVGContainer.classList.add("gallows-svg-container");
        gallowsSVGContainer.innerHTML = this.gallowsSvgHTML;
        this.gallowsContainer.append(gallowsSVGContainer);
        

        /**
         * QUESTIONS SECTION
         */

        // Questions Container
        this.questionsContainer = document.createElement("div");
        this.questionsContainer.classList.add("questions-container");
        this.mainContainer.append(this.questionsContainer);
        
        // Questions Container - Guess Word Section
        const guessWord = document.createElement("div");
        guessWord.classList.add("questions-guess-word");
        this.questionsContainer.append(guessWord);
        
        let currentWord = this.currentWord.word;
        for (let i = 0; i < currentWord.length; i += 1) {
            const guessLetters = document.createElement("div");
            guessLetters.classList.add("questions-guess-letters");
            guessLetters.setAttribute("id", `quess-letter-${i}`);
            guessLetters.innerHTML = "_";
            guessWord.append(guessLetters);
        }
        
        // Questions Container - Questions Hint Section
        const guessHint = document.createElement("div");
        guessHint.classList.add("questions-guess-hint");
        guessHint.classList.add("text-regular");
        guessHint.innerHTML = `Hint: ${this.currentWord.hint}`;
        this.questionsContainer.append(guessHint);

        // Questions Container - an Incorrect Guesses Counter
        const guessCounter = document.createElement("div");
        guessCounter.classList.add("questions-guess-counter");
        guessCounter.classList.add("text-regular");
        this.questionsContainer.append(guessCounter);
        
        const guessCounterText = document.createElement("div");
        guessCounterText.classList.add("questions-guess-counter-text");

        guessCounterText.innerHTML = "Incorrect guesses:";
        guessCounter.append(guessCounterText);

        const guessCounterInt = document.createElement("div");
        guessCounterInt.classList.add("questions-guess-counter-int");
        guessCounterInt.innerHTML = this.incorrectLetters;
        guessCounter.append(guessCounterInt);

        // Questions Container - Keyboard Section
        const guessKeyboard = document.createElement("div");
        guessKeyboard.classList.add("questions-guess-keyboard");
        this.questionsContainer.append(guessKeyboard);

        const keyboardChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        for (let i = 0; i < keyboardChars.length; i += 1) {
            const guessKeyboardChar = document.createElement("div");
            guessKeyboardChar.classList.add("questions-guess-keyboard-char");
            guessKeyboardChar.setAttribute("id", keyboardChars[i]);
            guessKeyboardChar.innerHTML = keyboardChars[i].toUpperCase();
            guessKeyboard.append(guessKeyboardChar);
        }

    }

    renderModal() {
        // Modal Container
        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        this.container.append(modalContainer);

        // Modal Box
       
        const modalBox = document.createElement("div");
        modalBox.classList.add("modal-container-box");
        const resultHTML = (this.gameScore.gameWin === true) ? "YOU WIN" : "YOU LOSE";
        modalBox.innerHTML =
        `
        <div class="modalText" class="text-regular">
        <h1 class="text-regular">${resultHTML}</h1>
        </div>
        <div class="text-regular">
            <p>Secret word was: <b>${this.currentWord.word}</b></p> 
        </div>
        <div class="text-regular">
            <p>Your Result</p>
            <p>Wins: <span id="modal-gameWinsScore">${this.gameScore.wins}</span></p>
            <p>Losses: <span id="modal-gameLossesScore">${this.gameScore.losses}<span></p>
        </div>
        <div class="modalBtn">
            <button class="text-regular" id="modal-box-btn" type="button">CONTINUE PLAYING</button>
        </div>
        <div class="modalReset text-regular">
            <a href="" onClick="this.gameStart()">RESET THE GAME</a>
        </div>
        `;
        
        modalContainer.append(modalBox);
        

        // Button event listener
        const modalBtn = document.querySelector("#modal-box-btn");
        modalBtn.addEventListener("click", (e) => {
            modalContainer.remove();
            this.gallowsContainer.remove();
            this.questionsContainer.remove();
            this.gameContinue();
        });

    }

}

export default View;