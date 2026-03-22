import React, { useState } from "react";
import Login from "./components/Login";
import Editor from "./components/Editor";
import Room from "./components/Room";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [roomId, setRoomId] = useState("");

  // 🔐 Not logged in → Login
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  // 🏠 No room selected → Room page
  if (!roomId) {
    return <Room setRoomId={setRoomId} />;
  }

  // 🧠 Room selected → Editor
  return <Editor roomId={roomId} />;
}

export default App;