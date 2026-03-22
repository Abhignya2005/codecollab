import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Room({ setRoomId }) {
  const [room, setRoom] = useState("");

  const createRoom = () => {
    const id = uuidv4();
    alert("Room ID: " + id);
    setRoomId(id);
  };

  const joinRoom = () => {
    if (!room.trim()) {
      alert("Please enter Room ID");
      return;
    }
    setRoomId(room);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        color: "white"
      }}
    >
      <div
        style={{
          backgroundColor: "#2d2d2d",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          width: "300px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)"
        }}
      >
        <h2>Join or Create Room</h2>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none",
            outline: "none"
          }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={joinRoom}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#007acc",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Join Room
          </button>

          <button
            onClick={createRoom}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;