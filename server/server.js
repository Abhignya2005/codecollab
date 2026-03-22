// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const User = require("./models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/auth");
// const { exec } = require("child_process");
// const fs = require("fs");
// // const auth = require("./middleware/auth");

// const app = express();

// // Middleware
// app.use(express.json()); // allows JSON data
// app.use(cors()); // allows frontend to connect

// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       username,
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.status(201).json({ message: "User created successfully" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // res.json({ message: "Login successful" });
//     const token = jwt.sign(
//   { userId: user._id },
//   "secretkey",
//   { expiresIn: "1h" }
// );

// res.json({
//   message: "Login successful",
//   token: token
// });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/profile", auth, (req, res) => {
//   res.json({
//     message: "Profile accessed",
//     user: req.user
//   });
// });

// app.post("/run-code", auth,async (req, res) => {
//   try {
//     const { code, language, input } = req.body;

//     if (language !== "python") {
//       return res.status(400).json({ message: "Only Python supported for now" });
//     }

//     // Save code to file
//     // const fileName = "temp.py";
//     const fileName = `temp_${Date.now()}.py`; //Date.now() → gives unique number , temp_17123456789.py . Every request → new file
//     fs.writeFileSync(fileName, code);

//     // // Execute code
//     // exec(`python ${fileName}`, (error, stdout, stderr) => {
//     //   fs.unlinkSync(fileName); // delete file
//     //   if (error) {
//     //     return res.json({ error: stderr });
//     //   }
//     //   res.json({ output: stdout });
//     // });

//     const process = exec(`python ${fileName}`, (error, stdout, stderr) => {
//       fs.unlinkSync(fileName);

//       if (error) {
//         return res.json({ error: stderr });
//       }

//     res.json({ output: stdout });
//     });

//     // send input
//     if (input) {
//     process.stdin.write(input + "\n");
//         process.stdin.end();
//     }

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
//   console.log("Run button clicked");
// });

// mongoose.connect("mongodb://127.0.0.1:27017/codecollab")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Start server
// // app.listen(5000, () => {
// //   console.log("Server running on port 5000");
// // });

// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*"
//   }
// });

// // SOCKET LOGIC
// io.on("connection", (socket) => {
//   console.log("User connected");

//   socket.on("join", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("code-change", ({ roomId, code }) => {
//     socket.to(roomId).emit("code-update", code);
//   });

//   socket.on("input-change", ({ roomId, input }) => {
//     socket.to(roomId).emit("input-update", input);
//   });

//   socket.on("output-change", ({ roomId, output }) => {
//     socket.to(roomId).emit("output-update", output);
//   });

//   // ✅ ADD THIS
//   socket.on("send-message", ({ roomId, message }) => {
//     socket.to(roomId).emit("receive-message", message);
//   });

// });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const User = require("./models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/auth");
// const { exec } = require("child_process");
// const fs = require("fs");

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // ---------------- AUTH ----------------

// app.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, email, password: hashedPassword });

//     await user.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { userId: user._id },
//       "secretkey",
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ---------------- RUN CODE ----------------

// app.post("/run-code", auth, async (req, res) => {
//   try {
//     const { code, language, input } = req.body;

//     if (language !== "python") {
//       return res.status(400).json({ message: "Only Python supported" });
//     }

//     const fileName = `temp_${Date.now()}.py`;
//     fs.writeFileSync(fileName, code);

//     const process = exec(`python ${fileName}`, (error, stdout, stderr) => {
//       fs.unlinkSync(fileName);

//       if (error) {
//         return res.json({ error: stderr });
//       }

//       res.json({ output: stdout });
//     });

//     if (input) {
//       process.stdin.write(input + "\n");
//       process.stdin.end();
//     }

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ---------------- SOCKET ----------------

// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" }
// });

// io.on("connection", (socket) => {
//   console.log("User connected");

//   socket.on("join", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("code-change", ({ roomId, code }) => {
//     socket.to(roomId).emit("code-update", code);
//   });

//   socket.on("input-change", ({ roomId, input }) => {
//     socket.to(roomId).emit("input-update", input);
//   });

//   socket.on("output-change", ({ roomId, output }) => {
//     socket.to(roomId).emit("output-update", output);
//   });

//   socket.on("send-message", ({ roomId, message }) => {
//     socket.to(roomId).emit("receive-message", message);
//   });

//   // ❗ FIX: THIS MUST BE INSIDE io.on
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // ---------------- DB ----------------

// mongoose.connect("mongodb://127.0.0.1:27017/codecollab")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const User = require("./models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/auth");
// const { exec } = require("child_process");
// const fs = require("fs");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ---------------- AUTH ----------------

// app.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashedPassword });

//   await user.save();
//   res.json({ message: "User created" });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign({ userId: user._id }, "secretkey");

//   res.json({ token });
// });

// // ---------------- RUN CODE ----------------

// const runCode = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     console.log("TOKEN:", token); // 👈 check token

//     const res = await fetch("http://localhost:5000/run-code", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         language: "python",
//         code,
//         input
//       })
//     });

//     const data = await res.json();

//     console.log("FULL RESPONSE:", data); // 👈 VERY IMPORTANT

//     // ✅ HANDLE ALL CASES
//     if (data.output) {
//       setOutput(data.output);
//     } else if (data.error) {
//       setOutput(data.error);
//     } else if (data.message) {
//       setOutput(data.message);
//     } else {
//       setOutput("No output");
//     }

//     // sync output to other tab
//     socketRef.current.emit("output-change", {
//       roomId,
//       output: data.output || data.error || data.message
//     });

//   } catch (err) {
//     console.log(err);
//     setOutput("Error running code");
//   }
// };

// // ---------------- SOCKET ----------------

// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" }
// });

// io.on("connection", (socket) => {
//   console.log("User connected");

//   socket.on("join", (roomId) => {
//     socket.join(roomId);
//     console.log("Joined:", roomId);
//   });

//   // CODE
// socket.on("code-change", ({ roomId, code, sender }) => {
//   socket.to(roomId).emit("code-update", {
//     code,
//     sender
//   });
// });

// // INPUT
// socket.on("input-change", ({ roomId, input, sender }) => {
//   socket.to(roomId).emit("input-update", {
//     input,
//     sender
//   });
// });

//   socket.on("output-change", ({ roomId, output }) => {
//     socket.to(roomId).emit("output-update", output);
//   });

//   socket.on("send-message", ({ roomId, message }) => {
//     socket.to(roomId).emit("receive-message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // ---------------- DB ----------------

// mongoose.connect("mongodb://127.0.0.1:27017/codecollab")
//   .then(() => console.log("MongoDB connected"));

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const User = require("./models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/auth");
// const { exec } = require("child_process");
// const fs = require("fs");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ---------------- AUTH ----------------

// app.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashedPassword });

//   await user.save();
//   res.json({ message: "User created" });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign({ userId: user._id }, "secretkey");

//   res.json({ token });
// });

// // ---------------- RUN CODE (CORRECT) ----------------

// app.post("/run-code", auth, (req, res) => {
//   console.log("RUN CODE API HIT");

//   const { code, input } = req.body;

//   const fileName = `temp_${Date.now()}.py`;
//   fs.writeFileSync(fileName, code);

//   const process = exec(`python ${fileName}`, (error, stdout, stderr) => {
//     fs.unlinkSync(fileName);

//     console.log("STDOUT:", stdout);
//     console.log("STDERR:", stderr);

//     if (error) {
//       return res.json({ error: stderr || "Execution error" });
//     }

//     res.json({ output: stdout || "No output" });
//   });

//   if (input) {
//     process.stdin.write(input + "\n");
//     process.stdin.end();
//   }
// });

// // ---------------- SOCKET ----------------

// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" }
// });

// io.on("connection", (socket) => {
//   console.log("User connected");

//   socket.on("join", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("code-change", ({ roomId, code, sender }) => {
//     socket.to(roomId).emit("code-update", { code, sender });
//   });

//   socket.on("input-change", ({ roomId, input, sender }) => {
//     socket.to(roomId).emit("input-update", { input, sender });
//   });

//   socket.on("output-change", ({ roomId, output }) => {
//     socket.to(roomId).emit("output-update", output);
//   });

//   socket.on("send-message", ({ roomId, message }) => {
//     socket.to(roomId).emit("receive-message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // ---------------- DB ----------------

// mongoose.connect("mongodb://127.0.0.1:27017/codecollab")
//   .then(() => console.log("MongoDB connected"));

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------- AUTH ----------------

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });

  await user.save();
  res.json({ message: "User created" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ userId: user._id }, "secretkey");

  res.json({ token });
});

// ---------------- RUN CODE (MULTI-LANGUAGE) ----------------

app.post("/run-code", auth, (req, res) => {
  console.log("RUN CODE API HIT");

  const { code, input, language } = req.body;

  let fileName;
  let command;

  
  try {
    if (language === "python") {
      fileName = `temp_${Date.now()}.py`;
      fs.writeFileSync(fileName, code);
      command = `python ${fileName}`;
    }

    else if (language === "javascript") {
      fileName = `temp_${Date.now()}.js`;
      fs.writeFileSync(fileName, code);
      command = `node ${fileName}`;
    }

    else if (language === "c") {
      fileName = `temp_${Date.now()}.c`;
      fs.writeFileSync(fileName, code);
      command = `gcc ${fileName} -o temp.exe && temp.exe`;
    }

    else if (language === "cpp") {
      fileName = `temp_${Date.now()}.cpp`;
      fs.writeFileSync(fileName, code);
      command = `g++ ${fileName} -o temp.exe && temp.exe`;
    }

    else if (language === "java") {
      fileName = `Main.java`;
      fs.writeFileSync(fileName, code);
      command = `javac ${fileName} && java Main`;
    }

    else if (language === "html") {
      return res.json({ output: "HTML cannot be executed. Use browser preview." });
    }

    else {
      return res.json({ error: "Language not supported" });
    }

    const process = exec(command, (error, stdout, stderr) => {
      // cleanup
      if (fileName && fs.existsSync(fileName)) fs.unlinkSync(fileName);
      if (fs.existsSync("temp.exe")) fs.unlinkSync("temp.exe");
      if (fs.existsSync("Main.class")) fs.unlinkSync("Main.class");

      console.log("STDOUT:", stdout);
      console.log("STDERR:", stderr);

      if (error) {
        return res.json({ error: stderr || "Execution error" });
      }

      res.json({ output: stdout || "No output" });
    });

    if (input) {
      process.stdin.write(input + "\n");
      process.stdin.end();
    }

  } catch (err) {
    res.json({ error: "Server error" });
  }
});

// ---------------- SOCKET ----------------

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});
const rooms = {};
const roomFiles = {};
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", ({ roomId, username }) => {
  socket.join(roomId);

  if (!rooms[roomId]) rooms[roomId] = [];

  if (!rooms[roomId].includes(username)) {
  rooms[roomId].push(username);
}
  socket.username = username;

  io.to(roomId).emit("users-update", rooms[roomId]);
});

  socket.on("language-change", ({ roomId, language }) => {
  console.log("LANG CHANGE:", language); // DEBUG
  io.to(roomId).emit("language-update", language);
});



  socket.on("files-change", ({ roomId, files }) => {
    roomFiles[roomId] = files;
    socket.to(roomId).emit("files-update", files);
  });

  socket.on("request-files", ({ roomId }) => {
    if (roomFiles[roomId]) {
      socket.emit("files-update", roomFiles[roomId]);
    }
  });
  

socket.on("cursor-change", ({ roomId, position }) => {
  socket.to(roomId).emit("cursor-update", position);
});

  socket.on("code-change", ({ roomId, code, sender }) => {
    socket.to(roomId).emit("code-update", { code, sender });
  });

  socket.on("input-change", ({ roomId, input, sender }) => {
    socket.to(roomId).emit("input-update", { input, sender });
  });

  socket.on("output-change", ({ roomId, output }) => {
    socket.to(roomId).emit("output-update", output);
  });

  socket.on("send-message", ({ roomId, message }) => {
    socket.to(roomId).emit("receive-message", message);
  });

  socket.on("files-change", ({ roomId, files }) => {
  socket.to(roomId).emit("files-update", files);
});

  socket.on("disconnect", () => {
  for (let roomId in rooms) {
    rooms[roomId] = rooms[roomId].filter(
      (user) => user !== socket.username
    );

    io.to(roomId).emit("users-update", rooms[roomId]);
  }

  console.log("User disconnected");
});
});

// ---------------- DB ----------------

mongoose.connect("mongodb://127.0.0.1:27017/codecollab")
  .then(() => console.log("MongoDB connected"));

server.listen(5000, () => {
  console.log("Server running on port 5000");
});