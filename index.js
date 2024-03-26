const express = require("express");
const blog = require("./routes/blogs");
const connectDb = require("./config/database");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//mount
app.use("/api/v1", blog);

app.listen(PORT, () => {
  console.log("app is started on port 3000");
});

connectDb();

app.get("/", (req, res) => {
  res.send(`<h1> this ishomepage </h1>`);
});
