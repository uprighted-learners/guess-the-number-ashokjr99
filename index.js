const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText + "\n", resolve);
  });
}

async function start() {
  let min = 1; // sets minimum
  let max = 100; // sets maximum

  let tries = 1; // attempts it takes to guess the number
  let running = true; //game on OR game over

  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise..." // my variable for the secret number
  );
  console.log("You entered: " + secretNumber);

  while (running === true) {
    let guess = Math.floor((max - min) / 2) + min; // the computer's guess at a number variable
    let answer = await ask(`is your secret number ${guess}? (Y/N)`); // the computer's guess at a number variable statement
    let panswer = ""; // open quotes for string to pass through variable

    if (answer === "N") {
      tries++; // increments the variable of tries in my loop
      panswer = await ask("Is it higher (H), or lower (L)?"); //my answer to the computer's guess
      if (panswer === "H") {
        min = guess; // sets new min
        if ((secretNumber = 100)) {
          let guess = Math.floor((max - min) / 2 + min) + 2;
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
