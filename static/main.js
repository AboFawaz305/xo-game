const Turn = {
	currentPlayer: 'x',
	symbol: 'X',
	end: function () {
		if (this.currentPlayer === 'x') {
			this.currentPlayer = 'o';
			this.symbol = 'O'
		} else if (this.currentPlayer === 'o') {
			this.currentPlayer = 'x';
			this.symbol = 'X'
		}
	},
	reset: function () {
		this.currentPlayer = "x"
		this.symbol = "X"
	}
}

const Score = {
	player1: 0,
	player2: 0
}

const turnBox = document.getElementById('current-turn');
const player1 = document.getElementById('p1-score');
const player2 = document.getElementById('p2-score');
const XOBordElement = document.getElementById('xo-game-board');
const XOBoardElementBoxes = XOBordElement.children;
const isAgainstCompBtn = document.getElementById('is-against-comp-btn');

let isAgainstComp = false;

isAgainstCompBtn.addEventListener('click', () => {
	isAgainstComp = !isAgainstComp;
})

turnBox.innerText = "X";
player1.innerText = Score.player1;
player2.innerText = Score.player2;

for (let i = 0; i < XOBoardElementBoxes.length; i++) {
	const box = XOBoardElementBoxes[i]

	box.addEventListener('click', handleClick);
}

function handleClick(e) {
	const box = e.target;
	const state = box.innerText;

	switch (state) {
		case '':
			box.innerText = Turn.symbol;
			Turn.end()
			turnBox.innerText = Turn.symbol;
			break

		default:
			box.style.background = 'red';
			setTimeout(() => { box.style.background = '' }, 1000)
			return
	}

	let winner = calculateWin()
	if (winner != "") {
		if (winner === "X") {
			Score.player1++;
			player1.innerText = Score.player1;
		} else if (winner === "O") {
			Score.player2++;
			player2.innerText = Score.player2;
		}
		resetGame()
		return
	}

	let i;
	for (i = 0; i < XOBoardElementBoxes.length; i++) {
		const box = XOBoardElementBoxes[i];
		if (box.innerText === "") {
			break;
		}
	}
	if (i === 9) {
		resetGame()
		return
	}
	if (isAgainstComp) {

		easyComputerMove()
		winner = calculateWin()
		if (winner != "") {
			if (winner === "X") {
				Score.player1++;
				player1.innerText = Score.player1;
			} else if (winner === "O") {
				Score.player2++;
				player2.innerText = Score.player2;
			}
			resetGame()
		}

		for (i = 0; i < XOBoardElementBoxes.length; i++) {
			const box = XOBoardElementBoxes[i];
			if (box.innerText === "") {
				break;
			}
		}
		if (i === 9) {
			resetGame()
		}

	}
}

function calculateWin() {
	// Check for the same row
	for (let i = 0; i < 3; i++) {
		let winner = XOBoardElementBoxes[i * 3].innerText
		let cwinner = winner;
		for (let j = 0; j < 3; j++) {
			cwinner = XOBoardElementBoxes[(i * 3) + j].innerText;
			if (winner != "" && winner != cwinner) {
				winner = ""
				break;
			}
		}
		if (winner != "") {
			return winner;
		}
	}

	// Check for the same column
	for (let i = 0; i < 3; i++) {
		let winner = XOBoardElementBoxes[i].innerText
		let cwinner = winner;
		for (let j = 0; j < 3; j++) {
			cwinner = XOBoardElementBoxes[(j * 3) + i].innerText;
			if (winner != "" && winner != cwinner) {
				winner = ""
				break;
			}
		}
		if (winner != "") {
			return winner;
		}
	}

	// Check for the same diagonal
	let winner = XOBoardElementBoxes[0].innerText
	let cwinner = winner;
	for (let i = 0; i < 9; i += 4) {
		cwinner = XOBoardElementBoxes[i].innerText
		if (winner != "" && winner != cwinner) {
			winner = "";
			continue;
		}
	}
	if (winner != "")
		return winner;

	winner = XOBoardElementBoxes[2].innerText
	cwinner = winner;
	for (let i = 2; i < 7; i += 2) {
		cwinner = XOBoardElementBoxes[i].innerText
		if (winner != "" && winner != cwinner) {
			winner = "";
			continue;
		}
	}
	if (winner != "")
		return winner;

	return winner;

}
function resetGame() {
	for (let i = 0; i < XOBoardElementBoxes.length; i++) {
		const box = XOBoardElementBoxes[i];
		box.innerText = "";
	}
	Turn.reset()
	turnBox.innerText = Turn.symbol
}

function easyComputerMove() {
	// get possible moves
	const moves = []
	for (let i = 0; i < XOBoardElementBoxes.length; i++) {
		const box = XOBoardElementBoxes[i];
		if (box.innerText === "") {
			moves.push(box);
		}
	}


	const randInt = Math.floor(Math.random() * moves.length);
	const move = moves[randInt]
	if (move) {
		move.innerText = Turn.symbol;
		Turn.end();
		turnBox.innerText = Turn.symbol;
	}
}
