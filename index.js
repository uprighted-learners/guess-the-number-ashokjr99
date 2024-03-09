const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText + "\n", resolve);
  });
}

//? Standard game code

async function start() {
  let tries = 1; // attempts it takes to guess the number
  let running = true; //game on OR game over

  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  let minCall = await ask(
    "First, let us set a range. What do you want your minimum to be?"
  );
  let maxCall = await ask("What do you want your maximum to be?");
  // storing user's min and max in variables

  let min = parseInt(minCall); // sets minimum
  let max = parseInt(maxCall); // sets maximum
  // parseint ensures number ONLY

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise..." // my variable for the secret number
  );
  console.log("You entered: " + secretNumber);

  while (running === true) {
    let guess = Math.floor((max - min) / 2 + min); // the computer's smart guess at a number variable
    let answer = await ask(`is your secret number ${guess}? (Y/N)`); // the computer's guess at a number variable statement
    let panswer = ""; // open quotes for string to pass through variable

    if (answer === "N") {
      tries++; // increments the variable of tries in my loop
      panswer = await ask("Is it higher (H), or lower (L)?"); //my answer to the computer's guess
      if (panswer === "H") {
        min = guess; // sets new min
        if (guess + 1 === max) {
          // conditional if the user's secret number is 100
          console.log(`Congrats your number is ${max}`);
          start(); // restarts my function if user is wanting to play again
        }
      } else if (panswer === "L") {
        max = guess; // sets new max
      }
    } else if (answer === "Y") {
      console.log(
        `The number was ${secretNumber}. Correct! It took you ${tries} tries.`
      );
      again = await ask("Do you want to play again?. Yes(Y) or No(N)?"); // variable for play again question
      if (again === "Y") {
        pickGame(); // restarts my function if user is wanting to play again
      } else {
        console.log("Thank you for playing. Bye.");
        running = false; // exits my loop, but likely redundant
        process.exit(); // exits my function if user is done
      }
    }
  }
}

//? Function for player to choose game

async function pickGame() {
  let gameOption = await ask(
    `Would you like to play the standard or reverse game?`
  );

  if (gameOption === "standard" || gameOption === "s") {
    start();
  } else if (gameOption === "reverse" || gameOption === "r") {
    reverseStart();
  } else {
    pickGame();
  }
}

pickGame(); //? THIS IS WHERE THE CODE STARTS TO RUN

//? REVERSE GAME

async function reverseStart() {
  let min = 1; // sets minimum
  let max = 100; // sets maximum
  const answer = Math.floor(Math.random() * (max - min + 1)); //random number generator

  let tries = 0; // atempts it takes to guess the number
  let guess; //the human's guess at a number between 1-100
  let running = true; //game on OR game over

  while (running === true) {
    guess = await ask(`Guess a number between ${min} - ${max}`); // new bounds logged in statement
    console.log(`My Guess is ${guess}`); // my guess logged in a statement
    guess = Number(guess); //  making sure my guess remains a number value ONLY

    if (guess < min || guess > max) {
      console.log(`Guess a number between ${min}-${max} ONLY`);
    } else {
      tries++; //will increment my tries variable
      if (guess < answer) {
        console.log("Your answer is too low! Try again!");
        min = guess; // sets new min
      } else if (guess > answer) {
        console.log("Your answer is too high! Try again!");
        max = guess; // sets new max
      } else {
        console.log(
          `The number was ${answer}. Correct! It took you ${tries} tries.`
        );
        again = await ask("Do you want to play again?. Yes(Y) or No(N)?"); // variable for play again question
        if (again === "Y" || again === "y") {
          pickGame(); // restarts my function if user is wanting to play again
        } else {
          console.log("Thank you for playing. Bye.");
          running = false; // exits my loop, but likely redundant
          process.exit(); // exits my function if user is done
        }
      }
    }
  }
}
