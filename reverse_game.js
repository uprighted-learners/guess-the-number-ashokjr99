const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText + "\n", resolve);
  });
}

async function start() {
  // console.log(
  //   "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  // );
  // let secretNumber = await ask(
  //   "What is your secret number?\nI won't peek, I promise..."
  // );
  // console.log("You entered: " + secretNumber);

  let min = 1; // sets minimum
  let max = 100; // sets maximum
  const answer = Math.floor(Math.random() * (max - min + 1)); //random number generator

  let tries = 0; // atempts it takes to guess the number
  let guess; //the human's guess at a number between 1-100
  let running = true; //game on OR game over

  while (running === true) {
    guess = await ask(`Guess a number between ${min} - ${max}`);
    console.log(`My Guess is ${guess}`);
    guess = Number(guess);

    if (guess < min || guess > max) {
      console.log(`Guess a number between 1-100 ONLY`);
    } else {
      tries++;
      if (guess < answer) {
        console.log("Your answer is too low! Try again!");
        min = guess;
      } else if (guess > answer) {
        console.log("Your answer is too high! Try again!");
        max = guess;
      } else {
        console.log(
          `The number was ${answer}. Correct! It took you ${tries} tries.`
        );
        running = false;
      }
    }
  }
}
start();

// process.exit();
