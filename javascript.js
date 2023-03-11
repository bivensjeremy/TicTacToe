log = console.log

// // Game Setup
// availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const winCombos = [
//     [1, 2, 3], 
//     [4, 5, 6], 
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [7, 5, 3]  
// ];

// playerMoves = [];
// computerMoves = [];

// //Game functions 
// $(".cell").click(function(){
//     var cellClick = $(this).attr("id").replace("cell_", "");
//     var select =  Number(cellClick);
//     $(this).text("X").off("click");
//     playerMoves.push(select);
//     availableMoves = availableMoves.filter(function(item){
//         return item !== select
//     })
//     computerMove();
// });

// //Computer Move
// function computerMove(){  
//     var computerNumber = availableMoves[Math.floor(Math.random() * availableMoves.length)];
//     $("#cell_"+ computerNumber).text("O");
//     computerMoves.push(computerNumber)
//     availableMoves = availableMoves.filter(function(item){
//         return item !== computerNumber
//     })
// };

availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var gameActive = true;
var gameState = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//Select clicked cell
$(".cell").click(handleCellClick);
$("#reset").click(handleRestartGame);

//Computer Move
function handlePlayerChange() {
    var computerNumber = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    $("#cell_"+ computerNumber).text("O");
    availableMoves = availableMoves.filter(function(item){
        return item !== computerNumber
     })
};

//Determine if Winner
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
    $("#winner").text("You Won!")
    $(".cell").off("click");
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        $("#winner").text("It's a Draw!!");
        $(".cell").off("click");
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

//Player Move
function handleCellClick(){
    var clickedCell = $(this).attr("id").replace("cell_", "");
    var clickedCellIndex =  Number(clickedCell);
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    availableMoves = availableMoves.filter(function(item){
       return item !== clickedCellIndex
    })
    handleCellPlayed(clickedCellIndex);
    handleResultValidation();
};

//Mark Player move on board
function handleCellPlayed(clickedCellIndex){
    $(".cell").click(function(){
        $(this).text(currentPlayer)
    })
    gameState[clickedCellIndex] = currentPlayer;
}

//Reset
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    availableMoves= [0, 1, 2, 3, 4, 5, 6, 7, 8]
    gameState = ["", "", "", "", "", "", "", "", ""];
    $("#winner").text(" ");
    $(".cell").text(" ")
    log(gameState)
}



   



    