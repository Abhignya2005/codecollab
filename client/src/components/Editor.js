// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// function Editor({ roomId }) {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");


//   const socketRef = useRef(null);

//   // 🔌 CONNECT SOCKET
// //   useEffect(() => {
// //   socketRef.current = io("http://localhost:5000");

// //   console.log("Socket connected:", socketRef.current.id); // 👈 ADD

// //   socketRef.current.emit("join", roomId);
// //   console.log("Joined room:", roomId); // 👈 ADD

// //   // REMOVE OLD LISTENERS FIRST
// // socketRef.current.off("receive-message");
// // socketRef.current.off("code-update");
// // socketRef.current.off("input-update");
// // socketRef.current.off("output-update");

// // // ADD NEW LISTENERS
// // socketRef.current.on("receive-message", (msg) => {
// //   console.log("Received message:", msg);
// //   setMessages((prev) => [...prev, msg]);
// // });

// // socketRef.current.on("code-update", (newCode) => {
// //   setCode(newCode);
// // });

// // socketRef.current.on("input-update", (newInput) => {
// //   setInput(newInput);
// // });

// // socketRef.current.on("output-update", (newOutput) => {
// //   setOutput(newOutput);
// // });

// //   return () => {
// //     socketRef.current.disconnect();
// //   };
// // }, [roomId]);

//     useEffect(() => {
//   socketRef.current = io("http://localhost:5000");

//   console.log("Socket connected");

//   socketRef.current.emit("join", roomId);
//   console.log("Joined room:", roomId);

//   // CLEAN OLD LISTENERS
//   socketRef.current.off("receive-message");
//   socketRef.current.off("code-update");
//   socketRef.current.off("input-update");
//   socketRef.current.off("output-update");

//   // ADD LISTENERS
//   socketRef.current.on("receive-message", (msg) => {
//     console.log("Received message:", msg);
//     setMessages((prev) => [...prev, msg]);
//   });

//   socketRef.current.on("code-update", setCode);
//   socketRef.current.on("input-update", setInput);
//   socketRef.current.on("output-update", setOutput);

//   return () => {
//     socketRef.current.disconnect();
//   };
// }, [roomId]);

//   // ✍️ CODE CHANGE
//   const handleCodeChange = (value) => {
//     setCode(value);

//     socketRef.current.emit("code-change", {
//       roomId,
//       code: value
//     });
//   };

//   // 🧾 INPUT CHANGE
//   const handleInputChange = (value) => {
//     setInput(value);

//     socketRef.current.emit("input-change", {
//       roomId,
//       input: value
//     });
//   };

//   // ▶️ RUN CODE
//   const runCode = async () => {
//   console.log("Run function called");

//   try {
//     const token = localStorage.getItem("token");

//     // ❗ IMPORTANT CHECK
//     if (!token) {
//       alert("Please login again");
//       return;
//     }

//     const response = await fetch("http://localhost:5000/run-code", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         language: "python",
//         code,
//         input
//       })
//     });

//     const data = await response.json();

//     console.log("Response:", data);

//     if (response.status === 401) {
//       alert("Session expired. Please login again");
//       localStorage.removeItem("token");
//       return;
//     }

//     setOutput(data.output || data.error || "No output");

//     // socket sync
//     socketRef.current.emit("output-change", {
//       roomId,
//       output: data.output || data.error
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     setOutput("Error running code");
//   }
// };

//   // 📋 COPY
//   const copyCode = () => {
//     navigator.clipboard.writeText(code);
//     alert("Code copied!");
//   };

//   // ⬇️ DOWNLOAD
//   const downloadCode = () => {
//     const blob = new Blob([code], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "code.py";
//     a.click();
//   };

//   const sendMessage = () => {
//   if (!message.trim()) return;

//   console.log("Sending:", message); // 👈 ADD

//   socketRef.current.emit("send-message", {
//     roomId,
//     message
//   });

//   setMessages((prev) => [...prev, message]);
//   setMessage("");
// };


//   return (
//     <div style={{ position: "relative", zIndex: 10 }}>
//       <h2>Code Editor</h2>

//       <p>Room: {roomId}</p>

//       {/* CODE */}
//       <textarea
//         rows="10"
//         cols="50"
//         value={code}
//         placeholder="Write your code here..."
//         onChange={(e) => handleCodeChange(e.target.value)}
//       />

//       <br /><br />

//       {/* BUTTONS */}
//       <button onClick={copyCode}>Copy Code</button>
//       <button onClick={downloadCode}>Download Code</button>
//       <button onClick={() => runCode()}>Run Code</button>

//       <br /><br />

//       {/* INPUT */}
//       <h3>Input:</h3>
//       <textarea
//         rows="3"
//         cols="50"
//         value={input}
//         placeholder="Enter input..."
//         onChange={(e) => handleInputChange(e.target.value)}
//       />

//       <br /><br />

//       {/* OUTPUT */}
//       <h3>Output:</h3>
//       <pre>{output}</pre>
//       <h3>Chat:</h3>

// <div style={{ border: "1px solid black", height: "150px", overflowY: "scroll" }}>
//   {messages.map((msg, index) => (
//     <p key={index}>{msg}</p>
//   ))}
// </div>

// <input
//   type="text"
//   placeholder="Type message..."
//   value={message}
//   onChange={(e) => setMessage(e.target.value)}
// />

// <button onClick={sendMessage}>Send</button>


//       <button onClick={() => setOutput("")}>Clear Output</button>
//     </div>
//   );
// }

// export default Editor;


// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// function Editor({ roomId }) {
//   const [code, setCode] = useState("");
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io("http://localhost:5000");

//     socketRef.current.emit("join", roomId);

//     socketRef.current.on("code-update", setCode);
//     socketRef.current.on("input-update", setInput);
//     socketRef.current.on("output-update", setOutput);

//     socketRef.current.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socketRef.current.disconnect();
//   }, [roomId]);

//   const handleCodeChange = (value) => {
//     setCode(value);
//     socketRef.current.emit("code-change", { roomId, code: value });
//   };

//   const handleInputChange = (value) => {
//     setInput(value);
//     socketRef.current.emit("input-change", { roomId, input: value });
//   };

//   const runCode = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5000/run-code", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ code, input })
//     });

//     const data = await res.json();

//     setOutput(data.output || data.error || "No output");

//     socketRef.current.emit("output-change", {
//       roomId,
//       output: data.output || data.error
//     });
//   };

//   const sendMessage = () => {
//     if (!message) return;

//     socketRef.current.emit("send-message", { roomId, message });

//     setMessages((prev) => [...prev, message]);
//     setMessage("");
//   };

//   return (
//     <div>
//       <h2>Room: {roomId}</h2>

//       <textarea
//         rows="10"
//         cols="50"
//         value={code}
//         onChange={(e) => handleCodeChange(e.target.value)}
//       />

//       <br />

//       <button onClick={runCode}>Run Code</button>

//       <h3>Input</h3>
//       <textarea
//         rows="3"
//         cols="50"
//         value={input}
//         onChange={(e) => handleInputChange(e.target.value)}
//       />

//       <h3>Output</h3>
//       <pre>{output}</pre>

//       <h3>Chat</h3>
//       <div style={{ border: "1px solid black", height: "150px", overflow: "auto" }}>
//         {messages.map((m, i) => (
//           <p key={i}>{m}</p>
//         ))}
//       </div>

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default Editor;


// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// function Editor({ roomId }) {
//   const [code, setCode] = useState("");
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const socketRef = useRef(null);
//   const userIdRef = useRef(Math.random().toString(36).substring(2)); // ✅ unique user

//   useEffect(() => {
//     socketRef.current = io("http://localhost:5000");

//     socketRef.current.emit("join", roomId);

//     // ❗ remove old listeners
//     socketRef.current.off("code-update");
//     socketRef.current.off("input-update");
//     socketRef.current.off("output-update");
//     socketRef.current.off("receive-message");

//     // ✅ CODE SYNC (ignore own updates)
//     socketRef.current.on("code-update", ({ code, sender }) => {
//       if (sender !== userIdRef.current) {
//         setCode(code);
//       }
//     });

//     // ✅ INPUT SYNC
//     socketRef.current.on("input-update", ({ input, sender }) => {
//       if (sender !== userIdRef.current) {
//         setInput(input);
//       }
//     });

//     // ✅ OUTPUT SYNC
//     socketRef.current.on("output-update", (data) => {
//       setOutput(data);
//     });

//     // ✅ CHAT
//     socketRef.current.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [roomId]);

//   // ✍️ CODE CHANGE
//   const handleCodeChange = (value) => {
//     setCode(value);

//     socketRef.current.emit("code-change", {
//       roomId,
//       code: value,
//       sender: userIdRef.current
//     });
//   };

//   // 🧾 INPUT CHANGE
//   const handleInputChange = (value) => {
//     setInput(value);

//     socketRef.current.emit("input-change", {
//       roomId,
//       input: value,
//       sender: userIdRef.current
//     });
//   };

//   // ▶️ RUN CODE
//   const runCode = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/run-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           language: "python",
//           code,
//           input
//         })
//       });

//       const data = await res.json();

//       const result = data.output || data.error || "No output";

//       setOutput(result);

//       // sync output
//       socketRef.current.emit("output-change", {
//         roomId,
//         output: result
//       });

//     } catch (err) {
//       setOutput("Error running code");
//     }
//   };

//   // 💬 SEND MESSAGE
//   const sendMessage = () => {
//     if (!message.trim()) return;

//     socketRef.current.emit("send-message", {
//       roomId,
//       message
//     });

//     setMessages((prev) => [...prev, message]);
//     setMessage("");
//   };

//   return (
//     <div style={{ padding: "10px" }}>
//       <h2>Room: {roomId}</h2>

//       {/* CODE */}
//       <textarea
//         rows="10"
//         cols="60"
//         value={code}
//         placeholder="Write code..."
//         onChange={(e) => handleCodeChange(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={runCode}>Run Code</button>

//       {/* INPUT */}
//       <h3>Input</h3>
//       <textarea
//         rows="3"
//         cols="60"
//         value={input}
//         placeholder="Enter input..."
//         onChange={(e) => handleInputChange(e.target.value)}
//       />

//       {/* OUTPUT */}
    //   <h3>Output</h3>
    //   <pre>{output}</pre>

//       {/* CHAT */}
//       <h3>Chat</h3>
//       <div
//         style={{
//           border: "1px solid black",
//           height: "150px",
//           overflowY: "scroll",
//           marginBottom: "10px",
//           padding: "5px"
//         }}
//       >
//         {messages.map((m, i) => (
//           <p key={i}>{m}</p>
//         ))}
//       </div>

//       <input
//         type="text"
//         placeholder="Type message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default Editor;


// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import Editor from "@monaco-editor/react";  

// function Editor({ roomId }) {
//   const [code, setCode] = useState("");
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [darkMode, setDarkMode] = useState(true);

//   const socketRef = useRef(null);
//   const userIdRef = useRef(Math.random().toString(36).substring(2));

//   useEffect(() => {
//     socketRef.current = io("http://localhost:5000");

//     socketRef.current.emit("join", roomId);

//     socketRef.current.off("code-update");
//     socketRef.current.off("input-update");
//     socketRef.current.off("output-update");
//     socketRef.current.off("receive-message");

//     socketRef.current.on("code-update", ({ code, sender }) => {
//       if (sender !== userIdRef.current) {
//         setCode(code);
//       }
//     });

//     socketRef.current.on("input-update", ({ input, sender }) => {
//       if (sender !== userIdRef.current) {
//         setInput(input);
//       }
//     });

//     socketRef.current.on("output-update", (data) => {
//       setOutput(data);
//     });

//     socketRef.current.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socketRef.current.disconnect();
//   }, [roomId]);

//   const handleCodeChange = (value) => {
//     setCode(value);
//     socketRef.current.emit("code-change", {
//       roomId,
//       code: value,
//       sender: userIdRef.current
//     });
//   };

//   const handleInputChange = (value) => {
//     setInput(value);
//     socketRef.current.emit("input-change", {
//       roomId,
//       input: value,
//       sender: userIdRef.current
//     });
//   };

//   const runCode = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/run-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           code,
//           input
//         })
//       });

//       const data = await res.json();

//       const result = data.output || data.error || "No output";

//       setOutput(result);

//       socketRef.current.emit("output-change", {
//         roomId,
//         output: result
//       });

//     } catch {
//       setOutput("Error running code");
//     }
//   };

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     socketRef.current.emit("send-message", { roomId, message });

//     setMessages((prev) => [...prev, message]);
//     setMessage("");
//   };

// return (
//   <div
//     style={{
//       display: "flex",
//       height: "100vh",
//       overflow: "hidden",
//       backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
//       color: darkMode ? "white" : "black"
//     }}
//   >

//     {/* LEFT SIDE */}
//     <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column" }}>

//       {/* TOP BAR */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>Room: {roomId}</h2>

//         {/* TOGGLE */}
    //     <div style={{ position: "relative" }}>
    //       <div
    //         onClick={() => setDarkMode(!darkMode)}
    //         onMouseEnter={(e) => {
    //           const tooltip = e.currentTarget.nextSibling;
    //           tooltip.style.opacity = "1";
    //           tooltip.style.transform = "translateY(0)";
    //         }}
    //         onMouseLeave={(e) => {
    //           const tooltip = e.currentTarget.nextSibling;
    //           tooltip.style.opacity = "0";
    //           tooltip.style.transform = "translateY(5px)";
    //         }}
    //         style={{
    //           width: "40px",
    //           height: "20px",
    //           backgroundColor: darkMode ? "#4caf50" : "#ccc",
    //           borderRadius: "20px",
    //           position: "relative",
    //           cursor: "pointer"
    //         }}
    //       >
    //         <div
    //           style={{
    //             width: "18px",
    //             height: "18px",
    //             backgroundColor: "white",
    //             borderRadius: "50%",
    //             position: "absolute",
    //             top: "1px",
    //             left: darkMode ? "20px" : "2px",
    //             transition: "0.2s"
    //           }}
    //         />
    //       </div>

    //       {/* TOOLTIP */}
    //       <div
    //         style={{
    //           position: "absolute",
    //           bottom: "28px",
    //           right: "0",
    //           backgroundColor: "#222",
    //           color: "white",
    //           padding: "4px 8px",
    //           fontSize: "11px",
    //           borderRadius: "4px",
    //           opacity: 0,
    //           transform: "translateY(5px)",
    //           transition: "0.2s",
    //           pointerEvents: "none"
    //         }}
    //       >
    //         {darkMode ? "Light" : "Dark"}
    //       </div>
    //     </div>
    //   </div>

//       {/* CODE */}
//       <textarea
//         style={{
//           flex: 1,
//           width: "100%",
//           resize: "none",
//           backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
//           color: darkMode ? "white" : "black",
//           border: "none",
//           padding: "10px"
//         }}
//         value={code}
//         onChange={(e) => handleCodeChange(e.target.value)}
//       />

//       <button
//         onClick={runCode}
//         style={{
//           padding: "10px",
//           backgroundColor: "#007acc",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//           marginTop: "10px"
//         }}
//       >
//         Run Code
//       </button>
//     </div>

//     {/* RIGHT SIDE */}
//     <div
//       style={{
//         flex: 1,
//         padding: "10px",
//         borderLeft: darkMode ? "2px solid #333" : "2px solid #ccc",
//         display: "flex",
//         flexDirection: "column"
//       }}
//     >

//       {/* INPUT */}
//       <h3>Input</h3>
//       <textarea
//         rows="3"
//         style={{
//           width: "100%",
//           backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
//           color: darkMode ? "white" : "black",
//           border: "none",
//           padding: "10px"
//         }}
//         value={input}
//         onChange={(e) => handleInputChange(e.target.value)}
//       />

//       {/* OUTPUT */}
//       <h3>Output</h3>
//       <pre
//         style={{
//           backgroundColor: darkMode ? "#111" : "#eee",
//           padding: "10px",
//           height: "100px",
//           overflowY: "auto"
//         }}
//       >
//         {output}
//       </pre>

//       {/* CHAT */}
//       <h3>Chat</h3>
//       <div
//         style={{
//           border: darkMode ? "1px solid #333" : "1px solid #ccc",
//           height: "120px",
//           overflowY: "auto",
//           padding: "5px"
//         }}
//       >
//         {messages.map((m, i) => (
//           <p key={i}>{m}</p>
//         ))}
//       </div>

//       {/* CHAT INPUT */}
//       <textarea
//         rows="2"
//         style={{
//           width: "100%",
//           padding: "8px",
//           backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
//           color: darkMode ? "white" : "black",
//           border: "none"
//         }}
//         placeholder="Type message and press Enter..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             e.preventDefault();
//             sendMessage();
//           }
//         }}
//       />
//     </div>
//   </div>
// );
// }

// export default Editor;  

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import MonacoEditor from "@monaco-editor/react"; // ✅ ADDED

function Editor({ roomId }) {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const [users, setUsers] = useState([]);
    
    const socketRef = useRef(null);
    const userIdRef = useRef(localStorage.getItem("userId") || Math.random().toString(36).substring(2));
    useEffect(() => {
      localStorage.setItem("userId", userIdRef.current);
    }, []);
    const usernameRef = useRef("User-" + Math.floor(Math.random() * 1000));




     // Save userId
  useEffect(() => {
    localStorage.setItem("userId", userIdRef.current);
  }, []);

  // Load saved code
  useEffect(() => {
    const saved = localStorage.getItem(`code-${roomId}`);
    if (saved) setCode(saved);
  }, [roomId]);

    useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

    useEffect(() => {
  socketRef.current = io("http://localhost:5000");

  // JOIN FIRST
  socketRef.current.emit("join", {
  roomId,
  username: usernameRef.current
});
socketRef.current.emit("request-files", { roomId });
  // LISTEN AFTER JOIN
  socketRef.current.on("code-update", ({ code, sender }) => {
      setCode((prev) => {
        if (prev !== code) return code;
        return prev;
    });
  });

  socketRef.current.on("cursor-update", (position) => {
  console.log("Other user cursor:", position);
});

  socketRef.current.on("language-update", (lang) => {
    setLanguage(lang);
  });

  socketRef.current.on("input-update", ({ input, sender }) => {
      setInput(input);
  });

  socketRef.current.on("output-update", (data) => {
    setOutput(data);
  });

  socketRef.current.on("receive-message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });
  socketRef.current.on("users-update", (usersList) => {
  setUsers(usersList);
});

socketRef.current.on("files-update", (updatedFiles) => {
  setFiles(updatedFiles);
});

  return () => {
    socketRef.current.disconnect();
  };
}, [roomId]);



    // ✅ UPDATED (important for Monaco)
    const handleCodeChange = (newCode) => {
    const updatedFiles = [...files];
    updatedFiles[activeFileIndex].code = newCode;
    setFiles(updatedFiles);

    socketRef.current.emit("files-change", {
  roomId,
  files: updatedFiles
});
  };

    const handleInputChange = (value) => {
        setInput(value);
        socketRef.current.emit("input-change", {
        roomId,
        input: value,
        sender: userIdRef.current
        });
    };

    const runCode = async () => {
  setLoading(true); // 🔥 start loading

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/run-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        input,
        code: activeFile.code,
        language: activeFile.language
      })
    });

    const data = await res.json();

    const result = data.output || data.error;

    setOutput(result);

    socketRef.current.emit("output-change", {
      roomId,
      output: result
    });

  } catch {
    setOutput("Error running code");
  } finally {
    setLoading(false); // 🔥 stop loading
  }
};

    const [files, setFiles] = useState([
  { name: "main.py", language: "python" ,code: "" }
]);

const [activeFileIndex, setActiveFileIndex] = useState(0);

const activeFile = files[activeFileIndex];



      const sendMessage = () => {
        if (!message.trim()) return;

        const msgData = {
          text: message,
          user: usernameRef.current, 
          time: new Date().toLocaleTimeString()
        };

        socketRef.current.emit("send-message", { roomId, message: msgData });

        setMessages((prev) => [...prev, msgData]);
        setMessage("");
      };

      // SAVE & DOWNLOAD
  const saveCode = () => {
    localStorage.setItem(`code-${roomId}`, code);
    alert("Saved!");
  };
  

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `code.${language}`;
    a.click();
  };

  const copyCode = () => {
  navigator.clipboard.writeText(code);
  alert("Code copied!");
  };

  const uploadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const content = event.target.result;
    const updatedFiles = [...files];
updatedFiles[activeFileIndex].code = content;

setFiles(updatedFiles);

socketRef.current.emit("files-change", {
  roomId,
  files: updatedFiles
});

    socketRef.current.emit("code-change", {
      roomId,
      code: content,
      sender: userIdRef.current
    });
  };

  reader.readAsText(file);
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const addNewFile = () => {
  const newFile = {
    name: `file${files.length + 1}.py`,
    language: "python",
    code: ""
  };
  const updatedFiles = [...files, newFile];

  setFiles([...files, newFile]);
  setActiveFileIndex(files.length);

  socketRef.current.emit("files-change", {
    roomId,
    files: updatedFiles
  });
};

  return (
  <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>


        {/* LEFT SIDE */}
<div style={{  flex: 1,  padding: "10px", display: "flex", flexDirection: "column", height: "100%" }}>

  {/* TOP BAR */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <h2>Room: {roomId}</h2>

      <button
      onClick={logout}
      style={{
        padding: "6px 12px",
        backgroundColor: "#e53935",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginLeft: "10px"
      }}
    >
      Logout
    </button>

      <select
        value={language}
        onChange={(e) => {
    setLanguage(e.target.value);
    console.log("Language changed:", e.target.value);

    socketRef.current.emit("language-change", {
        roomId,
        language: e.target.value
    });
    }}
        style={{ padding: "5px", borderRadius: "5px" }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="java">Java</option>
        <option value="html">HTML</option>
      </select>
    </div>

            {/* TOGGLE */}
            <div style={{ position: "relative" }}>
            <div
                onClick={() => setDarkMode(!darkMode)}
                onMouseEnter={(e) => {
                const tooltip = e.currentTarget.nextSibling;
                tooltip.style.opacity = "1";
                tooltip.style.transform = "translateY(0)";
                }}
                onMouseLeave={(e) => {
                const tooltip = e.currentTarget.nextSibling;
                tooltip.style.opacity = "0";
                tooltip.style.transform = "translateY(5px)";
                }}
                style={{
                width: "40px",
                height: "20px",
                backgroundColor: darkMode ? "#4caf50" : "#ccc",
                borderRadius: "20px",
                position: "relative",
                cursor: "pointer"
                }}
            >
                <div
                style={{
                    width: "18px",
                    height: "18px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "1px",
                    left: darkMode ? "20px" : "2px",
                    transition: "0.2s"
                }}
                />
            </div>

            {/* TOOLTIP */}
            <div
                style={{
                position: "absolute",
                bottom: "28px",
                right: "0",
                backgroundColor: "#222",
                color: "white",
                padding: "4px 8px",
                fontSize: "11px",
                borderRadius: "4px",
                opacity: 0,
                transform: "translateY(5px)",
                transition: "0.2s",
                pointerEvents: "none"
                }}
            >
                {darkMode ? "Light" : "Dark"}
            </div>
            </div>
        </div>

        <div style={{
  display: "flex",
  gap: "5px",
  marginBottom: "5px"
}}>
  {files.map((file, index) => (
    <div
      key={index}
      onClick={() => setActiveFileIndex(index)}
      style={{
        padding: "5px 10px",
        cursor: "pointer",
        backgroundColor: index === activeFileIndex ? "#007acc" : "#333",
        color: "white",
        borderRadius: "5px"
      }}
    >
      {file.name}
    </div>
  ))}

  <button onClick={addNewFile}>+</button>
</div>


            {/* ✅ MONACO EDITOR */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden"
          }}>
            
            <MonacoEditor
            key={roomId}
            height="100%"
            value={activeFile.code}
            language={activeFile.language}
            theme={darkMode ? "vs-dark" : "light"}
            onChange={(value) => handleCodeChange(value)}
            onMount={(editor) => {
    window.editorInstance = editor; // store globally
  }}

            // onMount={(editor) => {
            //   editor.onDidChangeCursorPosition((e) => {
            //     socketRef.current.emit("cursor-change", {
            //       roomId,
            //       position: e.position
            //     });
            //   });
            // }}
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px"
            }}
          >
            <button
              onClick={runCode}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#007acc",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Run Code
            </button>

            <button
              onClick={saveCode}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Save
            </button>

            <button
              onClick={downloadCode}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Download
            </button>
            {/* 🆕 COPY BUTTON */}
            <button
              onClick={copyCode}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#9c27b0",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Copy
            </button>
            {/* 🆕 FILE UPLOAD */}
            <input
              type="file"
              accept=".txt,.js,.py,.java,.html,.c,.cpp"
              onChange={uploadFile}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#444",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            />
          </div>
        </div>
        </div>


        {/* RIGHT SIDE */}
        <div
            style={{
            flex: 1,
            padding: "10px",
            borderLeft: darkMode ? "2px solid #333" : "2px solid #ccc",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "100%"
            }}
        >

            {/* INPUT */}
            <h3>Input</h3>
            <textarea
            rows="3"
            style={{
                width: "100%",
                backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
                color: darkMode ? "white" : "black",
                border: "none",
                padding: "10px"
            }}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            />

            {/* OUTPUT */}
            <h3>Output</h3>
            <pre
            style={{
                backgroundColor: darkMode ? "#e5dada" : "#171616",
                padding: "10px",
                height: "100px",
                overflowY: "auto"
            }}
            >
            {loading ? "⏳ Running..." : output}
            </pre>

            <h3>Active Users</h3>
<div>
  {users.map((u, i) => (
    <div key={i}>{u}</div>
  ))}
</div>

            {/* CHAT */}
            <h3>Chat</h3>
            <div
            style={{
                border: darkMode ? "1px solid #333" : "1px solid #ccc",
                height: "120px",
                flex: 1,
                overflowY: "auto",
                padding: "5px"
            }}
            
            >
            {messages.map((m, i) => (
              <div
  key={i}
  style={{
    marginBottom: "8px",
    textAlign: m.user === usernameRef.current ? "right" : "left"
  }}
>
  
        {/* USER */}
        <div style={{ fontSize: "12px", fontWeight: "bold" }}>
          {m.user}
        </div>

        {/* MESSAGE + TIME */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>{m.text}</span>

          <span style={{ fontSize: "10px", opacity: 0.7 }}>
            {m.time}
          </span>
        </div>

      </div>
            ))}
            <div ref={chatEndRef}></div>
            
            </div>

            {/* CHAT INPUT */}
            <textarea
            rows="2"
            style={{
                width: "100%",
                padding: "8px",
                backgroundColor: darkMode ? "#2d2d2d" : "#f5f5f5",
                color: darkMode ? "white" : "black",
                border: "none"
            }}
            placeholder="Type message and press Enter..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
                }
            }}
            />
        </div>
        </div>
    );
    }

    export default Editor;