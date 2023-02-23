const CHOICES = 3; //so if we want to alter our game to, say, rock, paper, scissors, spock we can do it easily

const winConditions = new Map([["rock", "scissors"], ["scissors", "paper"], ["paper", "rock"]]); 

function getComputerChoice() {
    const choice = getRandomInt();
    console.log("choice", choice);
    return Array.from(winConditions)[choice][0];  

    function getRandomInt() {
        console.log(CHOICES);
        return Math.floor(Math.random() * (CHOICES - 1) + 1); //bc zero indexing
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() === computerSelection) {
        return "It's a draw!";
    }
    else if (winConditions[playerSelection.toLowerCase()] === computerSelection){
        return "You win! " + formatSelection(playerSelection) + " beats " + formatSelection(computerSelection);
    }
    return "You lose! " + formatSelection(computerSelection) + " beats " + formatSelection(playerSelection);

    function formatSelection(selection) {
        return selection.charAt(0).toUpperCase() + selection.slice(1).toLowerCase();
    }
}

function formatSelection(selection) {
    return selection.charAt(0).toUpperCase() + selection.slice(1).toLowerCase();
}

let playerSelection = null;
do {
    playerSelection = prompt("Enter your choice: ");
} while(playerSelection === null || !winConditions.has(playerSelection.toLowerCase())); //keep asking for an input until the player gives us a valid choice

const computerSelection = getComputerChoice();
console.log("computer", computerSelection);

console.log(playRound(playerSelection, computerSelection));