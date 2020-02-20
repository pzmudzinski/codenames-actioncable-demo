import React, { useState } from "react";
import JoinRoom from "./JoinRoom";

import "./App.css";
import Lobby from "./Lobby";

function App() {
  const [roomId, changeRoomId] = useState(null);

  return (
    <div className="App">
      {!roomId && <JoinRoom onSubmit={changeRoomId} />}
      {roomId && <Lobby boardId={roomId} />}
    </div>
  );
}

export default App;
