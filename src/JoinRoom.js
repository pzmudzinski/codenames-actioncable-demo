import React, { useState } from "react";

const JoinRoom = ({ onSubmit }) => {
  const [boardId, idChange] = useState("");

  const submit = event => {
    event.preventDefault();
    onSubmit(boardId);
  };

  return (
    <form onSubmit={submit}>
      <h1> JOIN GAME </h1>
      <label>
        Board ID:
        <input
          onChange={event => idChange(event.target.value)}
          value={boardId}
        />
      </label>
      <button disabled={boardId.length === 0} type="submit">
        JOIN
      </button>
    </form>
  );
};

export default JoinRoom;
