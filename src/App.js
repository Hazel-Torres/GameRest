import React, { useEffect, useReducer } from 'react';
import Board from 'components/Board';
import Result from 'components/Result';
import Start from 'components/Start';
import {
  BOARD_SIZE,
  GAME_ENDED,
  GAME_PLAYING,
  GAME_READY,
  JUGADOR_UNO,
  JUGADOR_DOS,
  UNIT
} from 'config/const';
import useInterval from 'hooks/useInterval';
import getCellKey from 'utils/getCellKey';
import getPlayableCells from 'utils/getPlayableCells';
import playerCanChangeToDirection from 'utils/playerCanChangeToDirection';
import sumCoordinates from 'utils/sumCoordinates';
import './App.css';

const players = [JUGADOR_UNO, JUGADOR_DOS];

const initialState = {
  players,
  playableCells: getPlayableCells(
    BOARD_SIZE,
    UNIT,
    players.map((player) => getCellKey(player.position.x, player.position.y))
  ),
  gameStatus: GAME_READY
};

function updateGame(game, action) {
  if (action.type === 'start') {
    return { ...initialState, gameStatus: GAME_PLAYING };
  }
  if (action.type === 'restart') {
    return { ...initialState, gameStatus: GAME_READY };
  }
  if (action.type === 'move') {
    const newPlayers = game.players.map((player) => ({
      ...player,
      position: sumCoordinates(player.position, player.direction)
    }));

    const colisionJugadores = newPlayers.map((player) => {
      const myCellKey = getCellKey(player.position.x, player.position.y);
      return {
        ...player,
        hasDied:
          !game.playableCells.includes(myCellKey) ||
          newPlayers
            .filter((p) => p.id !== player.id)
            .map((p) => getCellKey(p.position.x, p.position.y))
            .includes(myCellKey)
      };
    });

    const celdaOcupada = game.players.map((player) =>
      getCellKey(player.position.x, player.position.y)
    );

    const celdasJugador = game.playableCells.filter((playableCell) => {
      return !celdaOcupada.includes(playableCell);
    });

    return {
      players: colisionJugadores,
      playableCells: celdasJugador,
      gameStatus:
        colisionJugadores.filter((player) => player.hasDied).length === 0
          ? GAME_PLAYING
          : GAME_ENDED
    };
  }
  if (action.type === 'changeDirection') {
    const nuevoJugador = game.players.map((player) => ({
      ...player,
      direction:
        player.keys[action.key] &&
          playerCanChangeToDirection(player.direction, player.keys[action.key])
          ? player.keys[action.key]
          : player.direction
    }));
    return {
      players: nuevoJugador,
      playableCells: game.playableCells,
      gameStatus: game.gameStatus
    };
  }
}

function App() {
  let RESULTADO = null;
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  const JUGADORES = game.players;
  const diedPlayers = JUGADORES.filter((player) => player.hasDied);
  if (diedPlayers.length > 0) {
    console.log(diedPlayers);
  }

  useInterval(
    function () {
      gameDispatch({ type: 'move' });
    },
    game.gameStatus !== GAME_PLAYING ? null : 100
  );

  useEffect(
    function () {
      function handleKeyPress(event) {
        const key = `${event.keyCode}`;
        if (key === '13') {
          if (game.gameStatus === GAME_READY) {
            handleStart();
          }
          if (game.gameStatus === GAME_ENDED) {
            handleRestart();
          }
        }
        gameDispatch({ type: 'changeDirection', key });
      }

      document.addEventListener('keydown', handleKeyPress);

      return function cleanUp() {
        document.removeEventListener('keydown', handleKeyPress);
      };
    },
    [game.gameStatus]
  );

  function handleStart() {
    gameDispatch({ type: 'start' });
  }

  function handleRestart() {
    gameDispatch({ type: 'restart' });
  }

  if (game.gameStatus === GAME_ENDED) {
    const GANADOR = game.players.filter((player) => !player.hasDied);
    if (GANADOR.length === 0) {
      RESULTADO = 'Empate';
    } else {
      RESULTADO = `Ganador: ${GANADOR.map((player) => `Jugador ${player.id}`).join(',')}`;
    }
  }

  return (
    <React.Fragment>
      <Board players={game.players} gameStatus={game.gameStatus} />
      {game.gameStatus === GAME_ENDED && <Result onClick={handleRestart} result={RESULTADO} />}
      {game.gameStatus === GAME_READY && <Start onClick={handleStart} />}
    </React.Fragment>
  );
}

export default App;
