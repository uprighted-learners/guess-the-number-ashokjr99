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

  let tries = 0; // atempts it takes to guess the number
  let running = true; //game on OR game over

  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise..."
  );
  console.log("You entered: " + secretNumber);

  while (running === true) {
    console.log(min, max);
    let guess = Math.floor((max - min) / 2) + min; // the computer's guess at a number
    let answer = await ask(`is your secret number ${guess}? (Y/N)`);
    let panswer = "";

    if (answer === "N") {
      tries++;
      panswer = await ask("Is it higher (H), or lower (L)?"); //my answer to the computer's guess
    }
    if (panswer === "H") {
      min = guess;
    } else if (panswer === "L") {
      max = guess;
    } else {
      console.log(
        `The number was ${secretNumber}. Correct! It took you ${tries} tries.`
      );
      again = await ask("Do you want to play again?. Yes(Y) or No(N)?");
      if (again === "Y") {
        start();
      } else {
        running = false;
      }
    }
  }
}
start();

// process.exit();
