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

const turnBox = document.getElementById('current-turn');
const XOBordElement = document.getElementById('xo-game-board');
const XOBordElementBoxes = XOBordElement.children;

turnBox.innerText = "X";

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
