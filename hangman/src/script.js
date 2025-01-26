import Hangman from "./Classes/Hangman.js";
const url = "./src/guess_words.json";
// const url = "./src/guess_words_small.json";
const data = await getData(url);

//  fetch JSON data
async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}


const game = new Hangman(data);
game.start();