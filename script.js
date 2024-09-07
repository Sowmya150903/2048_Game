const size = 4;
    let board = Array(size).fill().map(() => Array(size).fill(0));

    function createBoard() {
      const container = document.getElementById('game-container');
      container.innerHTML = '';
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          const tile = document.createElement('div');
          tile.classList.add('tile');
          updateTile(tile, board[row][col]);
          container.appendChild(tile);
        }
      }
    }

    function updateTile(tile, value) {
      tile.textContent = value ? value : '';
      tile.className = 'tile';
      if (value) {
        tile.classList.add(`tile-${value}`);
      }
    }

    function addNewTile() {
      let emptyTiles = [];
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (board[row][col] === 0) {
            emptyTiles.push({ row, col });
          }
        }
      }
      if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = 2; // Always add the number 2
        updateBoard();
      }
    }

    function slideLeft() {
      for (let row = 0; row < size; row++) {
        let newRow = board[row].filter(num => num);
        while (newRow.length < size) {
          newRow.push(0);
        }
        board[row] = newRow;
      }
    }

    function combineLeft() {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size - 1; col++) {
          if (board[row][col] !== 0 && board[row][col] === board[row][col + 1]) {
            board[row][col] *= 2;
            board[row][col + 1] = 0;
          }
        }
      }
    }

    function moveLeft() {
      slideLeft();
      combineLeft();
      slideLeft();
    }

    function reverseBoard() {
      for (let row = 0; row < size; row++) {
        board[row].reverse();
      }
    }

    function transposeBoard() {
      let newBoard = Array(size).fill().map(() => Array(size).fill(0));
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          newBoard[col][row] = board[row][col];
        }
      }
      board = newBoard;
    }

    function moveRight() {
      reverseBoard();
      moveLeft();
      reverseBoard();
    }

    function moveUp() {
      transposeBoard();
      moveLeft();
      transposeBoard();
    }

    function moveDown() {
      transposeBoard();
      moveRight();
      transposeBoard();
    }

    function updateBoard() {
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach((tile, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        updateTile(tile, board[row][col]);
      });
      checkGameOver(); // Check if the game is over after updating the board
    }

    // Logic to check if the game is over
    function isGameOver() {
      // Check for any empty tiles
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (board[row][col] === 0) return false; // Game is not over
        }
      }

      // Check for any adjacent tiles that can be combined
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size - 1; col++) {
          if (board[row][col] === board[row][col + 1]) return false; // Adjacent horizontal match
        }
      }

      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size - 1; row++) {
          if (board[row][col] === board[row + 1][col]) return false; // Adjacent vertical match
        }
      }

      // No empty tiles or possible moves left
      return true;
    }

    function checkGameOver() {
      if (isGameOver()) {
        document.getElementById('game-over').style.display = 'block'; // Show the game over message
      }
    }

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          addNewTile();
          break;
        case 'ArrowRight':
          moveRight();
          addNewTile();
          break;
        case 'ArrowUp':
          moveUp();
          addNewTile();
          break;
        case 'ArrowDown':
          moveDown();
          addNewTile();
          break;
      }
    });

    createBoard();
    addNewTile();
    addNewTile();