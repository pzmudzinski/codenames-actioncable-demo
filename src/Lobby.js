import React, { useState } from "react";
import { ActionCableProvider, ActionCable } from "actioncable-client-react";

const WSS_URL = "wss://codenames-game-api.herokuapp.com/cable";

const Status = ({ status, numberOfConnections }) => {
  return (
    <>
      <h1>Number of active connections</h1>
      <p>{numberOfConnections}</p>

      <h2>Status</h2>
      <p>{status}</p>
    </>
  );
};

const TileOpener = ({ board, perform }) => {
  const [tileIndex, changeIndex] = useState(0);

  const submit = event => {
    event.preventDefault();
    perform("reveal_tile", { index: tileIndex });
  };

  return (
    <>
      <h2>Game Status</h2>
      <p>{board.status}</p>
      <h2>Current turn</h2>
      <p>{board.current_turn}</p>
      <form onSubmit={submit}>
        <h2>Open tile</h2>
        <label>
          TILE INDEX
          <input
            onChange={event => changeIndex(event.target.value)}
            value={tileIndex}
            type="number"
            min={0}
            max={24}
          />
        </label>

        <button type="submit">OPEN</button>
      </form>
      <button onClick={() => perform("end_turn")}>END TURN</button>
      <h2>Tiles:</h2>
      <ol>
        {board.tiles.map(tile => (
          <li key={tile.index}>{JSON.stringify(tile)}</li>
        ))}
      </ol>
    </>
  );
};

const Lobby = ({ boardId }) => {
  const [board, changeBoard] = useState({ active_connections: 0, tiles: [] });
  const [status, changeStatus] = useState("connecting");

  return (
    <ActionCableProvider url={WSS_URL}>
      <ActionCable
        channel="BoardChannel"
        room={boardId}
        onReceived={changeBoard}
        onRejected={() => changeStatus("rejected")}
        onConnected={() => changeStatus("connected")}
        onDisconnected={() => changeStatus("disconnected")}
        onInitialized={() => changeStatus("initialized")}
      >
        <Status
          numberOfConnections={board.active_connections}
          status={status}
        />

        <TileOpener board={board} />
      </ActionCable>
    </ActionCableProvider>
  );
};

export default Lobby;
