const choices = ["rock", "paper", "scissors"];

const imageMap = {
  rock: "assets/rock.png",
  paper: "assets/paper.png",
  scissors: "assets/scissors.png",
};

const labelMap = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};

// Game state variables
let playerScore = 0;
let computerScore = 0;

const choiceButtons = document.querySelectorAll(".choice-btn");
const newGameBtn = document.getElementById("newGameBtn");

const playerImage = document.getElementById("playerImage");
const computerImage = document.getElementById("computerImage");
const playerLabel = document.getElementById("playerLabel");
const computerLabel = document.getElementById("computerLabel");

const roundResult = document.getElementById("roundResult");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");

// Initialize game
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playRound(playerChoice);
  });
});

newGameBtn.addEventListener("click", resetGame);

// Game logic functions
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  updateChoiceDisplay(playerChoice, computerChoice);

  const winner = decideWinner(playerChoice, computerChoice);
  updateScore(winner);
  updateScoreDisplay();

  if (winner === "player") {
    roundResult.textContent = "Player wins this round!";
  } else if (winner === "computer") {
    roundResult.textContent = "Computer wins this round!";
  } else {
    roundResult.textContent = "Draw! No points awarded.";
  }

  checkGameOver();
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function updateChoiceDisplay(playerChoice, computerChoice) {
  playerImage.src = imageMap[playerChoice];
  playerImage.alt = labelMap[playerChoice];

  computerImage.src = imageMap[computerChoice];
  computerImage.alt = labelMap[computerChoice];

  playerLabel.textContent = labelMap[playerChoice];
  computerLabel.textContent = labelMap[computerChoice];
}

function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  }

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  }

  return "computer";
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore += 1;
  }

  if (winner === "computer") {
    computerScore += 1;
  }
}

function updateScoreDisplay() {
  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
}

// Check if either player has reached 3 points to end the game
function checkGameOver() {
  if (playerScore === 3) {
    endGame("Player wins the game!");
  }

  if (computerScore === 3) {
    endGame("Computer wins the game!");
  }
}

function endGame(message) {
  alert(message);

  choiceButtons.forEach((button) => {
    button.disabled = true;
  });

  newGameBtn.disabled = false;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  updateScoreDisplay();

  playerImage.src = "assets/placeholder.png";
  computerImage.src = "assets/placeholder.png";

  playerLabel.textContent = "-";
  computerLabel.textContent = "-";
  roundResult.textContent = "Choose Rock, Paper, or Scissors.";

  choiceButtons.forEach((button) => {
    button.disabled = false;
  });

  newGameBtn.disabled = true;
}