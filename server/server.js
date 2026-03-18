const express = require("express");

const app = express();

// Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});