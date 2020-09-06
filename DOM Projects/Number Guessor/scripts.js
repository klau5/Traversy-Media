/* 
GAME RULES:
- player must guess a number btween a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify player of correct andwer if wrong
- let player choose to play again
*/

// game values
let min = 5,
	max = 17,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
	minNum = document.querySelector(".min-num"),
	maxNum = document.querySelector(".max-num"),
	guessBtn = document.querySelector("#guess-btn"),
	guessInput = document.querySelector("#guess-input"),
	message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener("mousedown", function (e) {
	if (e.target.className === "play-again") {
		window.location.reload();
	}
});

// listen for guess
guessBtn.addEventListener("click", function () {
	let guess = parseInt(guessInput.value);

	// validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, "red");
	}

	// check if correct number
	if (guess === winningNum) {
		// GAME OVER (WIN)
		gameOver(true, `${winningNum} is correct, YOU WIN!`);
	} else {
		// wrong guess
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// GAME OVER (LOST)
			gameOver(
				false,
				`GAME OVER, try again. The correct number was ${winningNum}`
			);
		} else {
			// continue if answer is wrong

			// change border color
			guessInput.style.borderColor = "red";

			// clear input
			guessInput.value = "";

			// tell user guess is wrong
			setMessage(`${guess} is wrong, ${guessesLeft} guesses left`, "red");
		}
	}
});

// GAME OVER
function gameOver(won, msg) {
	let color;
	won === true ? (color = "green") : (color = "red");

	// disable input
	guessInput.disabled = true;
	// change border color
	guessInput.style.borderColor = color;
	// set text color
	message.style.color = color;
	// set message for winning
	setMessage(msg);

	// play again
	guessBtn.value = "Play Again";
	guessBtn.className += "play-again";
}

// get random number
function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
