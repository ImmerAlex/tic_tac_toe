const $ = (selector) => document.querySelector(selector);
// @ts-ignore
const $$ = (selector) => document.getElementById(selector);

class Grid {
    constructor() {
        this._turn = 0;
        this._grid = this.init();
        this._player1 = new Player('X');
        this._player2 = new Player('O');
    }

    get grid() {
        return this._grid;
    }

    get player1() {
        return this._player1;
    }

    get player2() {
        return this._player2;
    }

    get turn() {
        return this._turn;
    }

    set turn(value) {
        this._turn = value;
    }

    autoPlay() {
        while (true) {
            if (this.checkVerticalWin()) {
                $$("winText").innerText = `Player ${this.turn % 2 === 0 ? this.player1.symbol : this.player2.symbol} wins in vertical!`;
                return;
            } else if (this.checkHorizontalWin()) {
                $$("winText").innerText = `Player ${this.turn % 2 === 0 ? this.player1.symbol : this.player2.symbol} wins in horizontal!`;
                return;
            } else if (this.checkDiagonalWin()) {
                $$("winText").innerText = `Player ${this.turn % 2 === 0 ? this.player1.symbol : this.player2.symbol} wins in diagonal!`;
                return;
            } else if (this.checkDraw()) {
                $$("winText").innerText = "It's a draw!";
                return;
            }

            const playerTurn = this.turn % 2 === 0 ? this.player1 : this.player2;
            const possibleMoves = this.getPossibleMoves();
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            const randomMove = possibleMoves[randomIndex];
            this.grid[randomMove] = playerTurn.symbol;

            this.displayGrid();
            this.turn++;
        }
    }

    init() {
        return [".", ".", ".",
            ".", ".", ".",
            ".", ".", "."];
    }

    displayGrid() {
        const game = $('.game');

        const newBoard = document.createElement('div');
        newBoard.classList.add('board');

        for (let i = 0; i < this.grid.length; i++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.innerText = this.grid[i] !== "." ? this.grid[i] : "";
            newBoard.appendChild(newCell);
        }

        const newLine = document.createElement('div');

        game.appendChild(newBoard);

        newLine.classList.add('line');
        game.appendChild(newLine);
    }

    getPossibleMoves() {
        const possibleMoves = [];

        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i] === ".") {
                possibleMoves.push(i);
            }
        }

        return possibleMoves;
    }

    checkHorizontalWin() {
        for (let i = 0; i < this.grid.length; i += 3) {
            if (this.grid[i] !== "." && this.grid[i] === this.grid[i + 1] && this.grid[i] === this.grid[i + 2]) {
                return true;
            }
        }

        return false;
    }

    checkVerticalWin() {
        for (let i = 0; i < 3; i++) {
            if (this.grid[i] !== "." && this.grid[i] === this.grid[i + 3] && this.grid[i] === this.grid[i + 6]) {
                return true;
            }
        }

        return false;
    }

    checkDiagonalWin() {
        return (this.grid[0] !== "." && this.grid[0] === this.grid[4] && this.grid[0] === this.grid[8]) ||
            (this.grid[2] !== "." && this.grid[2] === this.grid[4] && this.grid[2] === this.grid[6]);
    }

    checkDraw() {
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i] === ".") {
                return false;
            }
        }

        return true;
    }
}

class Player {
    constructor(symbol) {
        this._symbol = symbol;
    }

    get symbol() {
        return this._symbol;
    }
}



const grid = new Grid();
grid.autoPlay();
