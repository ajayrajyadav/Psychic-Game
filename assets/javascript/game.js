//initilizing variables
var alphabet = "abcdefghijklmnopqrstuvwxyz"; //all the possible guesses
var guess = 9; // chances you get to guess
var winsSoFar = 0; //how many games you won so far
var lossesSoFar = 0; //track how many times you lost
var yourGuess = ""; //empty string to save your guess
var yourGuessesSoFar = []; //saving your past guesses
var correctAnswer; //the letter you are trying to guess

var gameObject = {
    superHeroWords: ["Ironman", "superman", "Antman", "Vasp", "Hulk", "Thor", "Wonderwoman", "Flash", "Aquaman", "Spiderman"],
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    winsSoFar: 0,
    lossesSoFar: 0,
    correctAnswer: "",
    yourGuessesSoFar: "",
    gameOver: false,
    dashesAndGuesses: [],
};

var userText = document.getElementById("user-text");

document.onkeyup = function(event) {
    userText.textContent = createCorrectAnswer();
  };

//create a word to guess
function createCorrectAnswer(){
    gameObject.correctAnswer = gameObject.superHeroWords[Math.floor(Math.random() * gameObject.superHeroWords.length)];
    for (let i = 0; i < gameObject.correctAnswer.length; i++) {
        gameObject.dashesAndGuesses[i] = "_";
    }
    return gameObject.dashesAndGuesses.join(" ");
}

//publish the Correct Answer with '_'
function correctAnswerWithDashesToString(){

}
function correctAnswerWithDashesAndGuesses(userGuess){
    var stringWGuess = "";
    for (let index = 0; index < correctAnswer.length; index++) {
        if(correctAnswer[index]=== userGuess){
            dashesAndGuesses[index] = userGuess;
        }  
    }
}

//listen to user when they enter a letter

//check so it is not the same letter as before

//if it is the same as correctAnswer then you win

//increase number of wins

//otherwise save your guess into an array of guesses so far

//increase number of losses so far



