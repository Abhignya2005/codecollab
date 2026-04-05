# 💻 CodeCollab – Real-Time Collaborative Code Editor

## 🚀 Overview

CodeCollab is a real-time collaborative code editor that allows multiple users to write, edit, and execute code together in shared rooms. It mimics a VS Code-like environment in the browser with real-time synchronization, file management, and communication features.

---

## ✨ Features

### 🔐 Authentication System

* Signup / Login functionality
* JWT-based authentication
* Protected backend routes

---

### 🧑‍🤝‍🧑 Real-Time Collaboration

* Create / Join rooms
* Multiple users editing simultaneously
* Live synchronization using Socket.io

---

### 🧠 Code Editor

* Monaco Editor (VS Code-like experience)
* Multi-language support:

  * JavaScript
  * Python
  * Java
  * C/C++

---

### ⚡ Code Execution System

* Run code directly from frontend
* Backend execution API
* Supports:

  * Standard input
  * Output display
  * Error handling

---

### 💬 Chat System

* Real-time messaging
* Username + timestamp
* Auto-scroll to latest messages

---

### 👥 Active Users

* Displays users currently in the room

---

### 📂 File System (Tabs)

* Multiple files support
* Add / Switch files
* Upload files
* Save / Download / Copy code

---

### 🌙 UI Features

* Dark / Light mode toggle

---

## 🏗️ System Architecture (Advanced)

### 🔥 File-Based Architecture

Each file is managed as an object:

```json id="f1"}
{
  "id": "unique_id",
  "name": "file_name",
  "language": "programming_language",
  "content": "code_here"
}
```

👉 Enables scalable and structured collaboration (industry-level design)

---

### 🔥 Stable Code Synchronization

* Updates are file-specific
* Prevents overwriting of other files
* Ensures consistency across users

---

### 🔥 Socket Event Architecture

Clean and structured socket events:

* `join-room`
* `files-sync`
* `code-change`
* `code-update`
* `tab-change`
* `tab-update`

👉 Improves maintainability and debugging

---

### 🔥 Sync on Join

When a new user joins:

* All files are synced
* Active tab is shared
* Latest code is loaded

---

### 🔥 Tab Synchronization

* Switching tabs updates for all users in real-time

---

### 🔥 Single Source of Truth (Server)

Server manages:

* Files
* Active tab
* Code state

👉 Ensures consistency and avoids conflicts

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Monaco Editor
* Socket.io-client

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* MongoDB

---

## 📁 Project Structure

```
CodeCollab/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node + Express)
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash id="c1"}
git clone https://github.com/your-username/codecollab.git
cd codecollab
```

---

### 2️⃣ Backend Setup

```bash id="c2"}
cd server
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash id="c3"}
cd client
npm install
npm start
```

---

## 🔑 Environment Variables

Create `.env` in server:

```env id="c4"}
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## 🔮 Future Enhancements

* 🧠 AI Code Suggestions (CodeGenie integration)
* 🕓 Version History (Git-like system)
* 🔐 Role-based access (Admin / Viewer)
* 🌐 Deployment (Docker + Cloud)
* 📹 Voice / Video collaboration

---

## 👨‍💻 Author

* Abhignya

---

## ⭐ Why This Project Stands Out

* Real-time collaboration using WebSockets
* File-based architecture (industry standard)
* Scalable backend design
* Clean event-driven system
* Full-stack implementation

---

## 📜 License

MIT License
