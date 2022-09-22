## Game Description

For grading TA: check console for the correct word if you need.

### Host On Surge
Running as xuezhan@rice.edu (Student)

         domain: xuezhansun-hangman-Anya.surge.sh
         upload: [====================] 100% eta: 0.0s (15 files, 5878216 bytes)
            CDN: [====================] 100%
     encryption: *.surge.sh, surge.sh (237 days)
             IP: 138.197.235.123

Success! - Published to xuezhansun-hangman-Anya.surge.sh


### Hangman: Save Anya
This program is a game of hangman. The user is given 6 chances to guess 
the word. If the user guesses the word correctly, the user wins. 
If the user does not guess the word correctly, the user loses.

The **unique** aspect of this game:
- Background:
  - The SPYxFAMILY consists of four family members:
    - The spy father Loid Forger is disguised as a psychologist
    - The assassinator mother Yor Forger is disguised as a civil servant at Berlint City Hall
    - The adopted daughter Anya Forger has the super power of reading minds
    - The pet dog Bond Forger can foresee the future
  - One day their enemies found out their secret and kidnapped the daughter Anya.
    You, who is a neighbor of them, will use a hangman game to save the family.


### How to Play
The player will use the mouse to click the letters on screen. Each time you guess a letter
correctly, the letter will appear in the word, otherwise it remains to be an underscore. 
You have 6 chances to choose a wrong letter. Once you have used up all 6 chances, you lose the game.

When you finish one round of game, you can click the `Play Again` button to play another round.
This means, the game will not end until you refresh or reload the page.


### Player Behaviors
- cummulative score: 
  - you receive 1 point for each word you guess correctly
  - as you continue play the game, your score will be added to the previous score
  - once you refresh or reload the game, cummulative score will be reset to 0
- highest score
- clicks: total number of clicks within each round of game
- wrong guesses: total number of wrong clicks within each round of game
- time count: total time you spend within each round of game

### Local Storage
- The data stored in local storage are `highest score` and `clickTimes`
- The data will be stored only when you win a round

### Dynamic Difficulty
- Difficulty is determined by the length of the word, ranging from 1-10
- Initial difficulty is 3, +1 if you win a round, -1 if you lose a round
- There is also a `Hint` button, which will tell you the category of the word
