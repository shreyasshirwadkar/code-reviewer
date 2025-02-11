const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("HEllo World");
});
module.exports = app;
