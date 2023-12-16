const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function start() {
  const min = 1;
  const max = 100;
  const answer = Math.floor(Math.random() * (max - min + 1));

  let tries = 1;
  let guess;
  let running = true;

  guess = await ask(`Guess a number between ${min} - ${max}`);
  while (running === true) {
    guess = Number(guess);

    if (guess < min || guess > max) {
      console.log(`Guess a number between 1-100 ONLY`);
    } else {
      attempts++;
      if (guess < answer) {
        console.log("Your answer is too low! Try again!");
      } else if (guess > answer) {
        console.log("Your answer is too high! Try again!");
      } else {
        console.log(
          `The number was ${answer}. Correct! It took you ${tries}tries.`
        );
      }
    }

    running = false;
  }

  start();
  // console.log(
  //   "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  // );

  // let secretNumber = await ask(
  //   "What is your secret number?\nI won't peek, I promise...\n"
  // );

  // console.log("You entered: " + secretNumber);
  // // Now try and complete the program.

  // process.exit();
}
