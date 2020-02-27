function ChessBoard() {
    this.rows = 0;
    this.columns = 0;
    this.diagonals = [];

    this.setConfiguration = function(rows, columns) {
        this.rows = rows;
        this.columns = columns
    };

    this.createBoard = function() {
        for (var i = 0; i < (this.rows * this.columns); i++) {
            var chessBoard = document.getElementById("mainChessBoard").appendChild(document.createElement("div"));


            chessBoard.style.backgroundColor = parseInt((i / this.columns) + i) % 2 == 0 ? '#ababab' : 'white';

            var att = document.createAttribute("index");
            att.value = i;
            chessBoard.setAttributeNode(att);
        }
    };


    this.resetBoard = function(elements) {
        this.diagonals = [];
        for (let i = 0; i < (this.rows * this.columns); i++) {
            elements[i].style.backgroundColor = parseInt((i / this.rows) + i) % 2 == 0 ? '#ababab' : 'white';
        }
    };

    this.doActionOnBoard = function(elements) {
        for (var i = 0; i < (this.rows * this.columns); i++) {
            const rowI = Math.floor(Number(i) / this.rows);
            const columnI = i - (Math.floor(Number(i) / this.rows) * this.columns);
            for (var j = 0; j < this.diagonals.length; j++) {
                if (rowI == this.diagonals[j][0] && columnI == this.diagonals[j][1]) {
                    elements[i].style.background = "red";
                }
            }

        }
    };


    this.findDiagonalsUR = function(row, column) {
        this.diagonals.push([row, column]);
        const bRow = row - 1;
        const bColumn = column - 1;
        if (bRow >= 0 && bColumn >= 0) {
            this.findDiagonalsUR(bRow, bColumn);
        }
    }

    this.findDiagonalsUL = function(row, column) {
        this.diagonals.push([row, column]);
        const bRow = row - 1;
        const bColumn = column + 1;
        if (bRow >= 0 && bColumn < this.columns) {
            this.findDiagonalsUL(bRow, bColumn);
        }
    }

    this.findDiagonalsLR = function(row, column) {
        this.diagonals.push([row, column]);
        const bRow = row + 1;
        const bColumn = column + 1;
        if (bRow < this.rows && bColumn < this.columns) {
            this.findDiagonalsLR(bRow, bColumn);
        }
    }

    this.findDiagonalsLL = function(row, column) {
        this.diagonals.push([row, column]);
        const bRow = row + 1;
        const bColumn = column - 1;
        if (bRow < this.rows && bColumn >= 0) {
            this.findDiagonalsLL(bRow, bColumn);
        }
    }

}

var chess = new ChessBoard();
chess.setConfiguration(10, 10);
chess.createBoard();

var chessBoard = document.getElementById("mainChessBoard");
chessBoard.addEventListener("click", clickEvent);

function clickEvent(e) {
    var parent = e.target.parentElement.children;
    chess.resetBoard(parent);

    const elementIndex = e.target.getAttribute("index");
    const row = Math.floor(Number(elementIndex) / chess.rows);
    const column = elementIndex - (Math.floor(Number(elementIndex) / chess.rows) * chess.columns);

    // Find Diagonals
    chess.findDiagonalsUR(row, column);
    chess.findDiagonalsUL(row, column);
    chess.findDiagonalsLR(row, column);
    chess.findDiagonalsLL(row, column);


    chess.doActionOnBoard(parent);
}