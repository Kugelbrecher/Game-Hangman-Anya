// dictionary of words
var categoryList=['fruit','country', 'firm','programming']
var fruit=['apple','banana','orange','grape','watermelon','strawberry','blueberry','pineapple','kiwi','mango',
    'peach','pear','plum','cherry','lemon','lime','coconut','apricot','avocado','blackberry','blackcurrant','boysenberry',
    'cantaloupe','clementine','cranberry','currant','date','dragonfruit','durian','fig','gooseberry','grapefruit','guava'];
var country = ["china", "america", "japan", "india", "germany", "france", "russia", "brazil", "canada", "australia",
    "argentina", "bahrain", "belgium", "bolivia", "botswana", "bulgaria", "cambodia", "cameroon", "chile", "colombia",
    "croatia", "cuba", "cyprus", "denmark", "ecuador", "egypt", "estonia", "ethiopia", "finland", "greece", "guatemala",
    "honduras", "hungary", "iceland", "indonesia", "iran", "iraq"];
var firm = ["meta", "google", "amazon", "apple", "microsoft", "netflix", "uber", "airbnb", "tesla", "robinhood",
    "facebook", "twitter", "linkedin", "instagram", "snapchat", "tiktok", "wechat", "whatsapp", "alibaba", "baidu",
    "tencent", "jd", "didi", "xiaomi", "sina", "sogou", "bilibili", "pinduoduo", "tiktok", "discord"];
var programming = ["python", "java", "javascript", "ruby", "swift", "php", "perl", "c",
    "go", "scala", "kotlin", "rust", "haskell", "clojure", "erlang", "elixir", "lisp", "prolog",
    "fortran", "cobol", "pascal", "ada", "d", "dart", "groovy", "lua", "matlab", "delphi", "visual basic",
    "r", "sas", "sql", "assembly", "bash", "html", "css", "xml", "json", "yaml", "markdown", "latex", "vim",
    "emacs", "git", "svn", "mercurial", "docker", "kubernetes", "aws", "azure", "gcp", "tensorflow", "pytorch",
    "keras", "caffe", "pandas", "numpy", "matplotlib", "seaborn", "bokeh", "plotly", "d3",
    "flask", "django", "spring", "express", "rails", "sinatra", "tornado", "pyramid", "bottle", "web2py"];

var answer = '';
var answerType = '';
var wrongAttempt = 0;
var totalAttempt = 6;
var guessed = [];
var wordStatus = null;
var difficulty = 3; // initial at 3, 1~10total  3:20%~30%  1:0%~10%  10:90%~100%

// user behavior, local storage
var startTime
var endTime
var score = 0;
var timeCounter = 0;
var gameStatus={
    highestScore:0,
    clickTimes:0,
    // timeCounter:0,
    // gameHistory:[]
}
var _gameStatus = getLocalstorageItem('gameStatus');
if(_gameStatus){
    gameStatus = _gameStatus;
}


// get a random category
function getEffectiveArray() {
    var categoryIndex = Math.floor(Math.random() * categoryList.length);

    // var wordsList = categoryList[categoryIndex];
    var wordsList = window[categoryList[categoryIndex]];
    // console.log(wordsList);
    /*
    wordsList is an array of words as a result of the window command,
    it converts a string into a variable name: categoryList[categoryIndex] is a string, not an array
    */

    // if all words are used, select another category
    if (wordsList.length===0){
        // call back the function itself
        getEffectiveArray();
    }else{
        return {
            wordsList: wordsList,
            categoryIndex: categoryIndex
            // or simply
            // wordsList, categoryIndex
            // and note that keys can be different from the local variable names

        }
    }
}

function getRandomWord() {
    var wordsListInfo = getEffectiveArray();
    var wordsList = wordsListInfo.wordsList;
    // console.log(wordsList);
    var categoryIndex = wordsListInfo.categoryIndex;
    // console.log(categoryIndex);
    // another way:
    // var {wordsList,categoryIndex} = getEffectiveArray()

    // sort the words by length, from short to long
    wordsList = wordsList.sort(function(a,b){
        return a.length-b.length;
    })

    // get a random difficulty level, select a word from the corresponding index in wordsLists
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // pay attention the inclusive and not inclusive - (max-min+1) + min vs. (max-min) + min
    var randomNum = Math.random() * (difficulty * 0.1 - (difficulty - 1) * 0.1) + (difficulty - 1) * 0.1;
    var index = Math.round(randomNum * wordsList.length);
    answer = wordsList[index];
    answerType = categoryList[categoryIndex];
    console.log(answer);
    // console.log(answerType);
}

function generateKeyboard() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="mainGame('` + letter + `')"
      >
        ` + letter.toUpperCase() + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// displays the word with the letters guessed correctly o.w. underscores
function guessedLettersDisplay() {
    wordStatus = answer.split('').map(letter => {
        if (guessed.indexOf(letter) >= 0) {
            return letter;
        } else {
            return " _ ";
        }
    }).join('');
    // console.log(wordStatus);
    document.getElementById("wordArea").innerHTML = wordStatus;
}

function mainGame(letter) {
    // count times interval starting from the first click
    if (guessed.length===0){
        startTime  = new Date().getTime()
    }

    // guessed is an array of letters that have been guessed, disable the button
    guessed.indexOf(letter) === -1 ? guessed.push(letter) : null;
    // console.log(guessed);
    // https://bobbyhadz.com/blog/javascript-set-attribute-disabled
    document.getElementById(letter).setAttribute('disabled', true);
    // get the number of clicks
    gameStatus.clickTimes = guessed.length;
    // console.log(clickTimes);
    document.getElementById('clicks').innerHTML = gameStatus.clickTimes;

    // if the guessed letter is in the word, run the guessedLettersDisplay() function to update letters
    if (answer.indexOf(letter) >= 0) {
        guessedLettersDisplay();
        checkWon();
    // if the letter is not in the word, add to the wrong guesses
    } else if (answer.indexOf(letter) === -1) {
        wrongAttempt++;
        // if we use react, we can use setState() to update the wrongAttempt
        updateWrongAttempt();
        updateHangmanPicture();
        checkLose();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = 'images/hang' + wrongAttempt + '.jpg';
}

function updateWrongAttempt() {
    document.getElementById('wrongAttempt').innerHTML = wrongAttempt;
}

function updateScore() {
    document.getElementById('score').innerHTML = score;
}

function updateHighestScore() {
    if (gameStatus.highestScore < score) {
        gameStatus.highestScore = score;
        document.getElementById('highestScore').innerHTML = gameStatus.highestScore;
    }
}

function checkWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You Saved Anya!';
        document.getElementById('hangmanPic').src = 'images/win.jpg';

        score++;
        updateScore();
        updateHighestScore();

        if (difficulty<10) difficulty++;
        setLocalstorageItem('gameStatus',gameStatus)
        removeWordFromArray()
        endTime = new Date().getTime()
        timeCounter = (endTime - startTime)/1000
        document.getElementById("timeCounter").innerHTML = timeCounter + 's';
        // addNewGameData('win')
    }
}

function checkLose() {
    if (wrongAttempt === totalAttempt) {
        document.getElementById('wordArea').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'Anya is dead!';
        document.getElementById('hangmanPic').src = 'images/lose.jpg';
        if (difficulty>1) difficulty--
        removeWordFromArray()
        endTime = new Date().getTime()
        gameStatus.timeCounter = Math.round((endTime - startTime)/1000)
        document.getElementById("timeCounter").innerHTML = gameStatus.timeCounter + 's';
        // addNewGameData('lose')
        // setLocalstorageItem('gameStatus',gameStatus)
    }
}

// function addNewGameData(result) {
//     gameStatus.gameHistory.push({
//         word: answer,
//         time: Math.round((endTime - startTime)/1000),
//         clicks: gameStatus.clickTimes,
//         result: result
//     })
//     setLocalstorageItem('gameStatus',gameStatus)
// }

// generate a hint for the word
function hint() {
    var hint = answerType;
    document.getElementById("hint").innerHTML = ": " + hint;
}

function reset() {
    wrongAttempt = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = 'images/hang0.jpg';
    document.getElementById('clicks').innerHTML = '0';
    document.getElementById('hint').innerHTML = '';

    getRandomWord();
    guessedLettersDisplay();
    updateWrongAttempt();
    generateKeyboard();
}

document.getElementById("highestScore").innerHTML = gameStatus.highestScore;
document.getElementById("totalAttempt").innerHTML = totalAttempt;


// remove the word from the array, so that it will not appear again unless refresh the page
function removeWordFromArray() {
    var index = window[answerType].indexOf(answer);
    if (index > -1) {
        window[answerType].splice(index, 1);
    }
}

getRandomWord();
generateKeyboard();
guessedLettersDisplay();

/*
* check in console: JSON.stringify(gameStatus)
* */
function setLocalstorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalstorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
}


