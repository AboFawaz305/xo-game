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
const XOBordElementBoxes = XOBordElement.children;

turnBox.innerText = "X";
player1.innerText = Score.player1;
player2.innerText = Score.player2;

for (let i = 0; i < XOBordElementBoxes.length; i++) {
	const box = XOBordElementBoxes[i]

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
	}

}
