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
    let _board = document.querySelectorAll(".field");

    let _checkBoard = () => {
        const checkRows = () => {
            // Check rows
            for (let i = 0; i < 9; i += 3) {
                let c = board.state[i] + board.state[i + 1] + board.state[i + 2];
                if (c === 3 || c === -3) {
                    return true;
                }
            }
            return false;
          };
          const checkColumns = () => {
            // Check columns
            for (let i = 0; i < 3; i++) {
                let c = board.state[i] + board.state[i + 3] + board.state[i + 6];
              if (c === 3 || c === -3) {
                return true;
              }
            }
            return false;
          };
          const checkDiagonals = () => {
            // Check diagonals
            let c = board.state[0] + board.state[4] + board.state[8];
            let c2 = board.state[2] + board.state[4] + board.state[6]
            if (c === 3 || c === -3 || c2 === 3 || c2 === -3) {
              return true;
            }
            return false;
          };
          return checkRows() || checkColumns() || checkDiagonals();
    }

    const _die = () => {
        _board.forEach(e => {
            let copy = e.cloneNode(true);
            e.parentNode.appendChild(copy);
            e.remove();
        });
    }

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
        _board.forEach(e => {
            e.addEventListener("click", function mov(){
                if(_turn === 1){
                    if(_player.makeMove(_player.side, e.id) === 0){
                        _turn = 0;
                        _checkBoard();
                    }
                }
                else{
                    if(_enemy.makeMove(_enemy.side, e.id) === 0){
                        _turn = 1;
                    } 
                }
                if (_checkBoard() === true) _die();
            });
        })
    }
    return {gameStart};
})();

controller.gameStart("X", "PvP");