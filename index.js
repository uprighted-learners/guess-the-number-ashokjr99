const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText + "\n", resolve);
  });
}

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
        start(); // restarts my function if user is wanting to play again
      } else {
        running = false; // exits my loop, but likely redundant
        process.exit(); // exits my function if user is done
      }
    }
  }
}
start();
