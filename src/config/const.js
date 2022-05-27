export const UNIT = 15;
export const BOARD_SIZE = 750;

export const GAME_READY = 1;
export const GAME_PLAYING = 2;
export const GAME_ENDED = 3;

export const DIRECCION = {
  IZQUIERDA: { x: -UNIT, y: 0 },
  RIGHT: { x: UNIT, y: 0 },
  ARRIBA: { x: 0, y: -UNIT },
  ABAJO: { x: 0, y: UNIT }
}

export const JUGADOR_UNO = {
  color: '#CC0000',
  id: 'jugador 1',
  keys: {
    38: DIRECCION.ARRIBA,
    39: DIRECCION.DERECHA,
    40: DIRECCION.ABAJO,
    37: DIRECCION.IZQUIERDA
  },
  direction: DIRECCION.RIGHT,
  position: { x: UNIT * 6, y: UNIT * 6 },
  hasDied: false,
  instructions: 'Flechas de dirección'
}

export const JUGADOR_DOS = {
  color: '#0000CC',
  id: 'jugador 2',
  keys: {
    87: DIRECCION.ARRIBA,
    68: DIRECCION.RIGHT,
    83: DIRECCION.ABAJO,
    65: DIRECCION.IZQUIERDA
  },
  direction: DIRECCION.IZQUIERDA,
  position: { x: UNIT * 43, y: UNIT * 43 },
  hasDied: false,
  instructions: 'Teclas A-W-S-D'
}