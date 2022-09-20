/*Hangman Anya
This program is a game of hangman. The user is given 6 chances to guess the word. If the user guesses the word
correctly, the user wins. If the user does not guess the word correctly, the user loses.

The program uses the following functions:
1. getRandomWord() - This function gets a random word from the array of words, player should try to guess it.
2. displayWord() - This function displays the word with the letters guessed correctly and the letters not guessed
   correctly as underscores.
3. getGuess() - This function gets the user's guess.
4. checkGuess() - This function checks if the user's guess is correct.
5. checkWin() - This function checks if the user has won the game.
6. checkLose() - This function checks if the user has lost the game.
*/


/*
Is it possible to have a list of lists of words OR dictionary? So that player can choose the category of the word?
*/
var fruits = ["apple", "banana", "orange", "grape", "watermelon", "strawberry", "blueberry", "pineapple", "kiwi", "mango"];
var firms = ["meta", "google", "amazon", "apple", "microsoft", "netflix", "uber", "airbnb", "tesla", "robinhood"];
var programming_language = ["python", "java", "javascript", "ruby", "swift", "php", "perl", "c"];

var answer = '';
var totalAttempt = 6;
var usedAttempt = 0;
var guessed = [];
var wordStatus = null;


// get a random word from list of words/dictionary
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    answer = fruits[randomIndex];
    // return answer; // do i need this return?
    // alert(fruits[randomIndex]); // used to see the answer when checking the code
}


// generate the keyboard
// function generateButtons() {
//     var keyboard = document.getElementById("keyboard");
//     var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     for (var i = 0; i < letters.length; i++) {
//         var letter = letters[i];
//         var button = document.createElement("button");
//         button.innerHTML = letter;
//         button.onclick = function() {
//             // alert the letter that was clicked
//             alert(this.innerHTML);
//         }
//         keyboard.appendChild(button);
//     }
// }
// // OR
function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// displays the word with the letters guessed correctly o.w. underscores
function guessedWord() {
    // indexOf() check if the letter we guessed is in the word
    // this method returns the first index at which a given element can be found in the array,
    // or -1 if it is not present.
    // ? is a ternary operator
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    // join() to avoid commas
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById("wordSpotlight").innerHTML = wordStatus;
    // why do we need to specify wordStatus to be null instead of an empty string? difference between variable answer?
}
// // OR
// function displayWord(word, guesses) {
//     var display = "";
//     for (var i = 0; i < word.length; i++) {
//         if (guesses.indexOf(word[i]) >= 0) {
//             display += word[i];
//         } else {
//             display += "_";
//         }
//     }
//     return display;
// }

function handleGuess(letter) {
    // if the letter is not in the guesses list, add it to the list/push it to the list
    // if the letter is in the guesses list, do nothing / null
    
    // create a list of underscores that has the same length as the random word?
    // how to interpret this in terms of IF/ELSE?
    guessed.indexOf(letter) === -1 ? guessed.push(letter) : null;
    // setAttribute() https://www.w3schools.com/jsref/met_element_setattribute.asp
    // 'disabled' will disable the button independent of the value
    // https://stackoverflow.com/questions/7526601/setattributedisabled-false-changes-editable-attribute-to-false
    document.getElementById(letter).setAttribute('disabled', true);
    
    // if the guessed letter is in the word, run the guessedWord() function to update letters
    if (answer.indexOf(letter) >= 0) {
        guessedWord();
        checkWon();
    // if the letter is not in the word, add to the wrong guesses
    } else if (answer.indexOf(letter) === -1) {
        usedAttempt++;
        // if we use react, we can use setState() to update the usedAttempt
        updateusedAttempt();
        checkLose();
        updateHangmanPicture();
    } // else {
    //     console.log("error");
    // }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = 'images/hang' + usedAttempt + '.jpg';
}

function checkWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You Saved Anya!';
        document.getElementById('hangmanPic').src = 'images/win.jpg';
    }
}

function checkLose() {
    if (usedAttempt === totalAttempt) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'Anya is dead!';
        document.getElementById('hangmanPic').src = 'images/lose.jpg';
    }
}
// function checkWin(word, guesses) {
//     for (var i = 0; i < word.length; i++) {
//         if (guesses.indexOf(word[i]) < 0) {
//             return false;
//         }
//     }
//     return true;
// }
//
// function checkLose(guesses) {
//     if (guesses.length >= 6) {
//         return true;
//     } else {
//         return false;
//     }
// }


// update the number of wrong guesses, and the picture if guessed a wrong letter
function updateusedAttempt() {
    document.getElementById('usedAttempt').innerHTML = usedAttempt;
    // document.getElementById('hangmanPic').src = './images/' + attemptsUsed + '.jpg'; //already in handleGuess()
}



function reset() {
    usedAttempt = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = 'images/hang1.jpg';

    // reset the keyboard, word to be guessed, and the number of wrong guesses
    getRandomWord();
    guessedWord();
    updateusedAttempt();
    generateButtons();
}

document.getElementById("totalAttempt").innerHTML = totalAttempt;
// call this generateButtons() function to show keyboard on web
    // call the getRandomWord() function
getRandomWord();
generateButtons();
guessedWord();


/*
Other things to do:
1. fix code
2. add records for time count
3. provide choices of difficulty (choose a word category OR get a hint)
4. add game description
*/