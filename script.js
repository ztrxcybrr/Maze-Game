// script.js

document.addEventListener("DOMContentLoaded", function () {
    generateMaze();
    setupEventListeners();
});

function generateMaze() {
    var mazeContainer = document.getElementById("maze-container");

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement("div");
            cell.className = "maze-cell";
            cell.id = "cell-" + i + "-" + j;

            // Add start cell, end cell, and coins
            if (i === 0 && j === 0) {
                cell.classList.add("start-cell");
                cell.dataset.type = "start";
            } else if (i === 9 && j === 9) {
                cell.classList.add("end-cell");
                cell.dataset.type = "end";
            } else if (Math.random() < 0.2) {  // 20% chance for a coin
                cell.classList.add("coin-cell");
                cell.dataset.type = "coin";
            }

            mazeContainer.appendChild(cell);
        }
    }
}

function setupEventListeners() {
    document.addEventListener("keydown", function (event) {
        movePlayer(event.key);
    });
}

function movePlayer(direction) {
    var playerCell = document.querySelector(".player");
    var currentCell = playerCell.parentElement;

    var nextCell;
    switch (direction) {
        case "ArrowUp":
            nextCell = currentCell.previousElementSibling;
            break;
        case "ArrowDown":
            nextCell = currentCell.nextElementSibling;
            break;
        case "ArrowLeft":
            nextCell = playerCell.previousElementSibling;
            break;
        case "ArrowRight":
            nextCell = playerCell.nextElementSibling;
            break;
        default:
            return;
    }

    if (nextCell && !nextCell.classList.contains("wall-cell")) {
        if (nextCell.classList.contains("end-cell")) {
            alert("Congratulations! You reached the end of the maze!");
            resetGame();
        } else {
            playerCell.classList.remove("player");
            nextCell.appendChild(playerCell);
            playerCell.classList.add("player");
        }
    }
}

function resetGame() {
    var playerCell = document.querySelector(".player");
    var startCell = document.querySelector(".start-cell");

    playerCell.classList.remove("player");
    startCell.appendChild(playerCell);
    playerCell.classList.add("player");
}
