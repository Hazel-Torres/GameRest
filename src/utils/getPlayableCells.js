import getCellKey from 'utils/getCellKey';

export default function getPlayableCells(boardSize, cellSize, initialPositionPlayers) {
  const JugadorCells = [];
  for (let i = 0; i < boardSize / cellSize; i++) {
    for (let j = 0; j < boardSize / cellSize; j++) {
      const cellKey = getCellKey(i * cellSize, j * cellSize);
      if (!initialPositionPlayers.includes(cellKey)) {
        JugadorCells.push(cellKey);
      }
    }
  }

  return JugadorCells;
}
