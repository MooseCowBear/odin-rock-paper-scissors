const CHOICES = 5; 

const winConditions = new Map([
                        ["rock", ["scissors", "lizard"]], 
                        ["paper", ["rock", "spock"]], 
                        ["scissors", ["paper", "lizard"]], 
                        ["lizard", ["paper", "spock"]],
                        ["spock", ["rock", "scissors"]]
                     ]); 


function getComputerChoice() {
    const choice = getRandomInt();

    return Array.from(winConditions)[choice][0];  

    function getRandomInt() {
        return Math.floor(Math.random() * (CHOICES - 1) + 1); //bc zero indexing
    }
}

function playRound(playerSelection, computerSelection) { 
    if (playerSelection.toLowerCase() === computerSelection) { 
        return "tie";
    }
    else if (winConditions.get(playerSelection.toLowerCase()).includes(computerSelection)){ 
        return "win";
    }
    return "loss"; 
}

const resultDiv = document.getElementById("result");
let numWins = 0;
let numLosses = 0;

const resultModal = document.getElementById("modal");


const buttons = document.querySelectorAll("button");
console.log(buttons);
for (const button of buttons) {

    button.addEventListener("click", function(event) {
        const buttonClicked = event.target.closest("button");
        playRoundOfFive(buttonClicked);
    }); 
}
const closeSpan = document.getElementsByClassName("close")[0];

window.onclick = function(event) {
    if (event.target == resultModal) {
      resultModal.style.display = "none"; 
      resetGame();
    }
}
closeSpan.onclick = function() {
    modal.style.display = "none"; 
    resetGame();
}

function resetGame() {
    numWins = 0;
    numLosses = 0;
}

function resetChoices(personChoice, computerChoice) {
    console.log("person choice", personChoice);
    computerChoice.style.color = "transparent";
    personChoice.style.backgroundColor = "transparent"; 
}

function playRoundOfFive(button) {
    console.log("button", button.id, "was pressed");

    //highlight choice
    const selection = button.id;
    const buttonColor = window.getComputedStyle(button).color; 
    const buttonCircle = button.closest(".icon-circle-button");
    
    console.log("BUTTON COLOR", buttonColor); 
    buttonCircle.style.backgroundColor = buttonColor;
    
    if (numWins + numLosses < 5) {
        const computerSelection = getComputerChoice();

        const computerSelectionIcon = document.getElementById("computer-" + computerSelection);
        computerSelectionIcon.style.color = "white";

        const result = playRound(selection, computerSelection);
        console.log(result, "you selected", selection, "computer selected", computerSelection);

        if (result === "win") {
            numWins += 1;
        }
        else if (result === "loss") {
            numLosses += 1;
        }
        if ( numWins + numLosses < 5) {
            resultDiv.innerText = `Score: ${numWins} / ${numWins + numLosses}`;
        }
        else {
            displayResult();
        }

        //reset colors of choices after every round
        setTimeout(function () {
            console.log("Waited 2s");
            resetChoices(buttonCircle, computerSelectionIcon);
        }, 2000);

    }
}

function displayResult() {
    const finalResult = document.getElementById("final-result");
    const finalScore = document.getElementById("final-score");
    const finalEmoji = document.getElementById("final-score-face");

    finalEmoji.classList.remove((numWins > numLosses) ? "fa-face-frown" : "fa-face-smile-beam"); //if won, remove frowny face; else remove smiley
    finalEmoji.classList.add((numWins > numLosses) ? "fa-face-smile-beam" : "fa-face-frown"); //if won, add smiley; else frowny
    finalResult.innerText = (numWins > numLosses) ? "You Won!" : "You Lost";
    finalScore.innerText = `With a final score of: ${numWins} / ${numWins + numLosses}`;

    //display modal 
    resultModal.style.display = "block";
}