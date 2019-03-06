//initilizing variables
var alphabet = "abcdefghijklmnopqrstuvwxyz"; //all the possible guesses
var guess = 9; // chances you get to guess
var winsSoFar = 0; //how many games you won so far
var lossesSoFar = 0; //track how many times you lost

var yourGuessesSoFar = []; //saving your past guesses
var correctAnswer; //the letter you are trying to guess

var gameObject = {
    superHeroWords: ["ironman", "superman", "antman", "vasp", "hulk", "thor", "wonderwoman", "flash", "aquaman", "spiderman"],
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    winsSoFar: 0,
    lossesSoFar: 0,
    correctAnswer: "",
    yourGuessesSoFar: "",
    gameOver: false,
    dashesAndGuesses: [],
    guess: 0,
}

var yourGuess = ""; //empty string to save your guess

var tbUserText = document.getElementById("user-text");
var tbCorrectWord = document.getElementById("correct-word");
var tbGuessesLeft = document.getElementById("guesses-left")

tbUserText.textContent = createCorrectAnswer();
tbCorrectWord.textContent = correctAnswerWithDashesAndGuesses(yourGuess);
tbGuessesLeft.textContent = gameObject.guess;
//listen to user when they enter a letter
document.onkeyup = function(event) {
    yourGuess = event.key.toLowerCase();
    if(gameObject.guess > 0 && validateUserGuess(yourGuess)){
        tbGuessesLeft.textContent = gameObject.guess;
        // console.log(validateUserGuess(yourGuess));
    }
    // tbUserText.textContent = createCorrectAnswer();
    // tbUserText.textContent = gameObject.correctAnswer;
    tbCorrectWord.textContent = correctAnswerWithDashesAndGuesses(yourGuess);
  };

//create a word to guess
function createCorrectAnswer(){
    gameStarted = true;
    gameObject.dashesAndGuesses = [];
    returnStr = gameObject.correctAnswer = gameObject.superHeroWords[Math.floor(Math.random() * gameObject.superHeroWords.length)];
    gameObject.guess = returnStr.length * 2;
    return returnStr;
    // for (let i = 0; i < gameObject.correctAnswer.length; i++) {
    //     gameObject.dashesAndGuesses[i] = "_";
    // }
    // return gameObject.dashesAndGuesses.join(" ");
}

//publish the Correct Answer with '_'
function correctAnswerWithDashesAndGuesses(userGuess){
    for (let index = 0; index < gameObject.correctAnswer.length; index++) {
        if(userGuess===""){
            gameObject.dashesAndGuesses[index] = "_";
        }else if(gameObject.correctAnswer[index]=== userGuess){
            gameObject.dashesAndGuesses[index] = userGuess;
        } 
    }
    return gameObject.dashesAndGuesses.join(" ");
}

//check so it is not the same letter as before
function validateUserGuess(userGuess){
    //make sure the guess is part of the alphabet
    if (gameObject.alphabet.includes(userGuess) || (!userGuess==="Enter")) {
        gameObject.guess--;
        return true;
    } else {
        return false;
    }
}

//if it is the same as correctAnswer then you win

//increase number of wins

//otherwise save your guess into an array of guesses so far

//increase number of losses so far

//reset the game somehow when new number is picked



