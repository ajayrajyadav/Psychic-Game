//initilizing variables
// var alphabet = "abcdefghijklmnopqrstuvwxyz"; //all the possible guesses
// var guess = 9; // chances you get to guess
// var winsSoFar = 0; //how many games you won so far
// var lossesSoFar = 0; //track how many times you lost

// var yourGuessesSoFar = []; //saving your past guesses
// var correctAnswer; //the letter you are trying to guess

var gameObject = {
    superHeroWords: ["ironman", "superman", "antman", "vasp", "hulk", "thor", "wonderwoman", "flash", "aquaman", "spiderman", "storm", "blackwidow", "mystique", "loki", "hellboy", "deadpool"],
    superClues: ["Wears Iron Suit", "Man of Steel", "Can shrink", "Can Shrink", "Becomes Green", "Has a Hammer", "Has a Lasso", "Can run fast", "Can Breath Under Water", "shoots web", "Can Control Weather", "Natasha Romanova", "Can Shapshift", "God of Mischief","Has Horns", "wears red suit"],
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    winsSoFar: 0,
    lossesSoFar: 0,
    correctAnswer: "",
    currentClue: "",
    yourGuessesSoFar: [],
    alreadyEntered: -1, //lets keep this as deafult value for now
    gameOver: false,
    dashesAndGuesses: [],
    guess: 8,
}


var imageArray = [
    "./assets/images/hangman/0.jpg", 
    "./assets/images/hangman/1.jpg", 
    "./assets/images/hangman/2.jpg",
    "./assets/images/hangman/3.jpg",
    "./assets/images/hangman/4.jpg",
    "./assets/images/hangman/5.jpg",
    "./assets/images/hangman/6.jpg",
    "./assets/images/hangman/7.jpg",
    "./assets/images/hangman/8.jpg"
]
var yourGuess = ""; //empty string to save your guess

var tbUserText = document.getElementById("user-text");
var tbCorrectWord = document.getElementById("correct-word");
var tbGuessesLeft = document.getElementById("guesses-left");
var tbGuessesSoFar = document.getElementById("yourGuess");
var tbJumbotronInfobar = document.getElementById("jumbo-tron");
var tbWinsSoFar = document.getElementById("wins-so-far");
var tbLossesSoFar = document.getElementById("losses-so-far");
var tbCurrentClue = document.getElementById("current-clue");
var imgHangmanImage = document.getElementById("hangman-Image")


document.getElementById("start-game").onclick = function () {
    startGame();
};

function publishDefaults() {
    //maybe add default text when game resets. part of refactor
}

function resetTheGame() {
    // tbJumbotronInfobar.textContent= "the game reset";
    gameObject.correctAnswer = "";
    gameObject.yourGuessesSoFar = [];
    tbGuessesSoFar.textContent = allUserGuesses();
    gameObject.alreadyEntered = -1;
    gameObject.gameOver = false;
    gameObject.dashesAndGuesses = [];
    tbCorrectWord.textContent = correctAnswerWithDashesAndGuesses("");
    tbCurrentClue.textContent = "";
    imgHangmanImage.src = imageArray[imageArray.length-1];
}
function startGame() {
    resetTheGame();
    tbJumbotronInfobar.textContent = "New game started..."
    tbUserText.textContent = createCorrectAnswer();
    tbCorrectWord.textContent = correctAnswerWithDashesAndGuesses("");
    tbGuessesLeft.textContent = "You have " + gameObject.guess + " guesses left";

    //listen to user when they enter a letter
    document.onkeyup = function (event) {
        tbJumbotronInfobar.textContent = "";
        yourGuess = event.key.toLowerCase();
        if (gameObject.guess > 0) {
            if (validateUserGuess(yourGuess)) {
                tbGuessesLeft.textContent = "You have " + gameObject.guess + " guesses left";
                tbCorrectWord.textContent = correctAnswerWithDashesAndGuesses(yourGuess);
                tbGuessesSoFar.textContent = allUserGuesses();
                if (hasCorrectAnswerBeenGuessed()) {
                    tbJumbotronInfobar.textContent = "You Win!"
                    gameObject.winsSoFar++;
                    tbWinsSoFar.textContent = gameObject.winsSoFar;
                    resetTheGame();
                }
            }
        } else {
            gameObject.lossesSoFar++;
            tbLossesSoFar.textContent = gameObject.lossesSoFar;
            tbJumbotronInfobar.textContent = "Sorry... Better luck next time..."
            resetTheGame();
        }
    };
}

//has correct answer been guessed?
function hasCorrectAnswerBeenGuessed() {
    var result;
    for (let i = 0; i < gameObject.correctAnswer.length; i++) {
        if (gameObject.correctAnswer[i] === gameObject.dashesAndGuesses[i]) {
            result = true;
        } else {
            result = false;
            break;
        }
    }
    return result;
}

//create a word to guess
function createCorrectAnswer() {
    gameStarted = true;
    gameObject.dashesAndGuesses = [];
    var randNumber = Math.floor(Math.random() * gameObject.superHeroWords.length);
    returnStr = gameObject.correctAnswer = gameObject.superHeroWords[randNumber];
    gameObject.currentClue = gameObject.superClues[randNumber];
    gameObject.guess = 8;
    return returnStr;
}

//publish the Correct Answer with '_'
function correctAnswerWithDashesAndGuesses(userGuess) {
    for (let index = 0; index < gameObject.correctAnswer.length; index++) {
        if (userGuess === "") {
            gameObject.dashesAndGuesses[index] = "_";
        } else if (gameObject.correctAnswer[index] === userGuess) {
            //yay you havde a correct guess
            gameObject.dashesAndGuesses[index] = userGuess;
        }
    }
    return gameObject.dashesAndGuesses.join(" ");
}

//make the guesses publishable
function allUserGuesses() {
    return gameObject.yourGuessesSoFar.join(", ");
}

//check so it is not the same letter as before
function validateUserGuess(userGuess) {
    //make sure the guess is part of the alphabet
    if (gameObject.alphabet.includes(userGuess) || (!userGuess === "Enter")) {
        if (gameObject.yourGuessesSoFar.indexOf(userGuess) >= 0) {
            //it seems they enter the same letter
            tbJumbotronInfobar.textContent = "You already guessed that letter"
            return false;
        } else if (gameObject.correctAnswer.includes(userGuess)) {
            gameObject.yourGuessesSoFar.push(userGuess);
            return true;
        } else {
            gameObject.guess--;
            if(gameObject.guess === 2)
            {
                tbCurrentClue.textContent = "Here is a clue: " + gameObject.currentClue;
            }
            imgHangmanImage.src = imageArray[gameObject.guess];
            gameObject.yourGuessesSoFar.push(userGuess);
            return true;
        }
    } else {
        tbJumbotronInfobar.textContent = "Please guess a letter from alphabet"
        return false;
    }
}

//if it is the same as correctAnswer then you win

//increase number of wins

//otherwise save your guess into an array of guesses so far

//increase number of losses so far

//reset the game somehow when new number is picked



