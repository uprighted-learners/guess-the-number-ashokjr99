const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText + "\n", resolve);
  });
}

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
        if (again === "Y" || "y") {
          reverseStart(); // restarts my function if user is wanting to play again
        } else {
          running = false; // exits my loop, but likely redundant
          process.exit(); // exits my function if user is done
        }
      }
    }
  }
}
reverseStart();

//
