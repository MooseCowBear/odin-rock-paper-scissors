const CHOICES = 3; //so if we want to alter our game to, say, "rock, paper, scissors, lizard, spock" we can do it pretty easily

const winConditions = new Map([["rock", "scissors"], ["scissors", "paper"], ["paper", "rock"]]); 

console.log(winConditions)

function getComputerChoice() {
    const choice = getRandomInt();

    return Array.from(winConditions)[choice][0];  

    function getRandomInt() {
        return Math.floor(Math.random() * (CHOICES - 1) + 1); //bc zero indexing
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() === computerSelection) {
        return 0;
    }
    else if (winConditions.get(playerSelection.toLowerCase()) === computerSelection){
        return 1;
    }
    return -1;
}

function game() {
    let wins = 0;
    let losses = 0;

    while (wins + losses < 5) { //if we tie, we don't count that in our number of rounds
        let playerSelection = null;
        do {
            playerSelection = prompt("Enter your choice: ");
        } while(playerSelection === null || !winConditions.has(playerSelection.toLowerCase())); //keep asking for an input until the player gives us a valid choice

        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        if (result > 0) {
            wins ++;
            console.log("You win! " + formatSelection(playerSelection) + " beats " + formatSelection(computerSelection));
        }
        else if (result < 0) {
            losses ++;
            console.log("You lose! " + formatSelection(computerSelection) + " beats " + formatSelection(playerSelection));
        }
    }

    if (wins > losses) {
        return "You win! With a score of " + wins + " to " + losses + " .";
    }
    return "You lose! With a score of " + wins + " to " + losses + " .";

    function formatSelection(selection) {
        return selection.charAt(0).toUpperCase() + selection.slice(1).toLowerCase();
    }
}

const test = game();
console.log("test result", test);