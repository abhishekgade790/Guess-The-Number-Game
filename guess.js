const input = document.getElementById('inputGuess');
const submit = document.getElementById('sub');
const previousGuess = document.getElementById('prev');
const remainingGuess = document.getElementById('remain');
const validationMessage = document.getElementById('valid');
const result = document.getElementById('result');

const p = document.createElement('p');
p.style.border = '2px double black';
p.style.marginLeft = '6rem';
p.style.marginRight = '6rem';
p.style.background = '#789ACBA6';

let random = Math.ceil(Math.random() * 100);
let playGame = true;
let numguess = 1;
let prevArr = [];

if (playGame) {
  submit.addEventListener('click', handleGuess);
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGuess();
    }
  });
}

function handleGuess() {
  const guess = parseInt(input.value);
  validateGuess(guess);
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    displayMessage('Please enter a valid number.');
  } else if (guess <= 0) {
    displayMessage('Please enter a positive number.');
  } else if (guess > 100) {
    displayMessage('Please enter a number less than or equal to 100.');
  } else {
    validationMessage.innerHTML = '';
    prevArr.push(guess);
    if (numguess === 10) {
      displayGuess(guess);
      displayMessage(`Game over! The random number was ${random}.`);
      endGame();
    } else {
      checkGuess(guess);
      displayGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === random) {
    displayMessage('Congratulations! Your guess is correct.');
    endGame();
  } else if (guess < random) {
    displayMessage('Your guess is too low.');
  } else {
    displayMessage('Your guess is too high.');
  }
}

function displayGuess(guess) {
  input.value = '';
  previousGuess.innerHTML = prevArr.join(', ');
  numguess++;
  remainingGuess.innerHTML = `${11 - numguess}`;
}

function displayMessage(message) {
  validationMessage.innerHTML = message;
}

function endGame() {
  input.value = '';
  input.setAttribute('disabled', true);
  p.classList.add('button');
  p.innerHTML = '<h5 id="newgame">Start New Game</h5>';
  result.appendChild(p);
  playGame = false;
  setupNewGameButton();
}

function setupNewGameButton() {
  const newGameBtn = document.querySelector('#newgame');
  newGameBtn.addEventListener('click', function () {
    resetGame();
  });
}

function resetGame() {
  random = Math.ceil(Math.random() * 100);
  numguess = 1;
  prevArr = [];
  previousGuess.innerHTML = '';
  remainingGuess.innerHTML = `${11 - numguess}`;
  input.removeAttribute('disabled');
  result.removeChild(p);
  displayMessage('');
  playGame = true;
}
