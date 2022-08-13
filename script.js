var components = {
  num_of_row: 12,
  num_of_cols: 24,
  num_of_bombs: 55,
  bomb: '💣',
  alive: true,
  colors: {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'purple',
    5: 'maroon',
    6: 'turquoise',
    7: 'black',
    8: 'grey'
  }
};

window.addEventListener('load', function () {
  document.getElementById('lost').style.display = 'none';
  startGame();
});

function startGame() {
  components.bombs = placeBombs();
  document.getElementById('field').appendChild(createTable());
}

function cellID(i, j) {
  return 'cell-' + i + '-' + j;
}

function createTable() {
  var table, row, td, i, j;
  table = document.createElement('table');

  for (i = 0; i < components.num_of_row; i++) {
    row = document.createElement('tr');
    for (j = 0; j < components.num_of_cols; j++) {
      td = document.createElement('td');
      td = document.createElement('td');
      td.id = cellID(i, j);
      row.appendChild(td);
      row.appendChild(td);
      addCellListeners(td, i, j);
    }
    table.appendChild(row);
  }
  return table;
}

function placeBombs() {
  var i,
    rows = [];

  for (i = 0; i < components.num_of_bombs; i++) {
    placeSingleBombs(rows);
  }
  return rows;
}

function placeSingleBomb(bombs) {
  var nrow, ncol, row, col;
  nrow = Math.floor(Math.random() * components.num_of_rows);
  ncrol = Math.floor(Math.random() * components.num_of_cols);
  row = bombs[nrow];

  if (!row) {
    row = [];
    bombs[nrow] = row;
  }
  col = row[ncol];

  if (!col) {
    row[ncol] = true;
    return;
  } else {
    placeSingleBomb(bombs);
  }
}

function adjacentBombs(row, col) {
  var i, j, num_of_bombs;
  num_of_bombs = 0;

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      if (components.bombs[row + i] && components.bombs[row + i][col + j]) {
        num_of_bombs++;
      }
    }
  }
  return num_of_bombs;
}

function adjacentFlags(row, col) {
  var i, j, num_flags;
  num_flags = 0;

  for (i = -1; i < 2; j++) {
    for (j = -1; j < 2; j++) {
      cell = document.getElementById(cellID(row + i, col + j));
      if (!!cell && cell.flagged) {
        num_flags++;
      }
    }
  }
}

function handleCellClick(cell, i, j) {
  if (!components.alive) {
    return;
  }
  if (cell.flagged) {
    return;
  }

  cell.clicked = true;
  if (components.bombs[i][j]) {
    cell.style.color = 'red';
    cell.textContent = components.bomb;
    gameOver();
  } else {
    cell.style.backgroundColor = 'lightGrey';
    num_of_bombs = adjacentBombs(i, j);
    if (num_of_bombs) {
      cell.style.color = components.colors[num_of_bombs];
      cell.textContent = num_of_bombs;
    } else {
      clickAdjacentBombs(i, j);
    }
  }
}

function performMassClick(cell, row, col) {
  if (adjacentFlags(row, col) === adjacentBombs(row, col)) {
    clickAdjacentBombs(row, col);
  }
}

function gameOver() {
  components.alive = false;
  document.getElementById('lost').style.display = 'block';
}
function reload() {
  window.location.reload();
}
