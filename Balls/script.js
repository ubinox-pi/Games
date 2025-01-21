const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let paddleX, ballX, ballY, ballSpeedX, ballSpeedY, score, isGameRunning;

// Paddle settings
const paddleWidth = 150;
const paddleHeight = 20;
const paddleSpeed = 50;

// Ball settings
const ballRadius = 15;

// Initialize game
function initGame() {
  paddleX = (canvas.width - paddleWidth) / 2;
  ballX = canvas.width / 2;
  ballY = 50;
  ballSpeedX = 4;
  ballSpeedY = 6;
  score = 0;
  isGameRunning = true;
}

// Event listener for paddle movement
document.addEventListener("keydown", (e) => {
  if (isGameRunning) {
    if (e.key === "ArrowLeft" && paddleX > 0) {
      paddleX -= paddleSpeed;
    } else if (e.key === "ArrowRight" && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleSpeed;
    }
  }
});

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Draw score
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Game loop
function update() {
  if (!isGameRunning) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw elements
  drawPaddle();
  drawBall();
  drawScore();

  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with walls
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddle
  if (
    ballY + ballRadius > canvas.height - paddleHeight - 10 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballSpeedY = -ballSpeedY;
    score++;
  }

  // Ball falls below paddle
  if (ballY + ballRadius > canvas.height) {
    isGameRunning = false;
    startButton.textContent = "Restart Game";
    startButton.style.display = "block";
  }

  requestAnimationFrame(update);
}

// Start game
startButton.addEventListener("click", () => {
  initGame();
  startButton.style.display = "none";
  update();
});

// Display start button initially
startButton.style.display = "block";
