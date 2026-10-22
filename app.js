
const game = () => {

    // Player and computer scores
    let playerScore = 0;
    let computerScore = 0;

    // Start the game
    const startGame = () => {
        const playButton = document.querySelector(".intro-button");
        const introScreen = document.querySelector(".intro");
        const matchScreen = document.querySelector(".match");

        playButton.addEventListener("click", () => {
            introScreen.style.display = "none";
            matchScreen.classList.remove("fadeOut");
            matchScreen.classList.add("fadeIn");
        });
    };

    // Play a round
    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const winner = document.querySelector(".winner");

        const computerOptions = ["rock", "paper", "scissors"];
        let playing = false;

        options.forEach(option => {
            option.addEventListener("click", function() {

                // Stop extra clicks during animation
                if (playing) {
                    return;
                }

                playing = true;

                // Choose computer move
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                const playerChoice = this.textContent.trim().toLowerCase();

                // Reset hands
                playerHand.textContent = "✊";
                computerHand.textContent = "✊";
                winner.textContent = "Rock, Paper, Scissors...";

                // Animate hands
                playerHand.style.animation = "shakePlayer 1.5s";
                computerHand.style.animation = "shakeComputer 1.5s";

                // Show result after animation
                setTimeout(() => {
                    compareHands(playerChoice, computerChoice);

                    // Display choices
                    const handSymbols = {
                        rock: "✊",
                        paper: "✋",
                        scissors: "✌️"
                    };

                    playerHand.textContent = handSymbols[playerChoice];
                    computerHand.textContent = handSymbols[computerChoice];

                    playerHand.style.animation = "";
                    computerHand.style.animation = "";

                    playing = false;

                }, 1500);
            });
        });
    };

    // Compare player and computer choices
    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector(".winner");

        // Tie
        if (playerChoice === computerChoice) {
            winner.textContent = "It's a tie!";
            return;
        }

        // Player wins
        if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            winner.textContent = "You win!";
            playerScore++;
        } else {
            // Computer wins
            winner.textContent = "Computer wins!";
            computerScore++;
        }

        // Update scores
        document.querySelector(".player-score p").textContent = playerScore;
        document.querySelector(".computer-score p").textContent = computerScore;
    };

    // Run the game functions
    startGame();
    playMatch();
};

// Start everything
game();
