"use strict"

const board = (() => {
    let state = [];
    let _board = document.querySelectorAll(".field");
    console.log(_board);
    let _erase = () => {
        let _children = document.querySelectorAll(".field > *");
        _children.forEach(e => e.remove());
    }
    let drawBoard = () => {
        _erase();
        for(let i = 0; i < 9; i++){
            if(state[i] === -1){
                _board.forEach(e => {
                    if(e.id == i){
                        let _O = document.createElement("img");
                        _O.setAttribute("src", "./images/circle-outline.svg");
                        e.appendChild(_O);
                    }
                });
            }
            if(state[i] === 1){
                _board.forEach(e => {
                    if(e.id == i){
                        let _X = document.createElement("img");
                        _X.setAttribute("src", "./images/alpha-x.svg");
                        e.appendChild(_X);
                    }
                });
            }
        }
    }
    return {state, drawBoard};
})();

let player = (side) => {
    this.side = side;
    let makeMove = (side, index) => {
        if(side === "X" && !board.state[index]){
            board.state[index] = 1;
            board.drawBoard();
            return 0;
        }
        if(side === "O" && !board.state[index]){
            board.state[index] = -1;
            board.drawBoard();
            return 0;
        }
        return -1;
    }
    return {side, makeMove}
}
let AI = (side) => {
    this.side = side;
    let makeMove = (side, index) => {

    }
}

const controller = (() => {
    let _turn;
    let gameStart = (side, gameMode) => {
        let _player = player(side);
        let _enemy;
        if(gameMode === "PvP"){ 
            _enemy = player(side === "X" ? "O" : "X");
        }
        else if(gameMode === "PvE"){
            _enemy = AI(side === "X" ? "O" : "X");
        }
        console.log(_player);
        console.log(_enemy);
        if(side === "X"){
            _turn = 1;
        }
        if(side === "O"){
            _turn = 0;
        }
        let _board = document.querySelectorAll(".field");
        _board.forEach(e => {
            e.addEventListener("click", function(){
                if(_turn === 1){
                    if(_player.makeMove(_player.side, e.id) === 0){
                        _turn = 0;
                    }
                }
                else{
                    if(_enemy.makeMove(_enemy.side, e.id) === 0){
                        _turn = 1;
                    }
                    
                }
            });
        })
    }
    return {gameStart};
})();

controller.gameStart("X", "PvP");