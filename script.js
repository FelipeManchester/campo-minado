let components = {
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
  let table, row, td, i, j;
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
