const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://tejaswi:tejaswi@cluster0.9ckhp.mongodb.net/Trail"
);

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database Connected");
});
db.on("error", () => {
  console.log("Database not Connected");
});

app.use(express.json());
app.use(cors());

app.use("/User-Data", routes);

const port = 5500;
app.listen(port, () => {
  console.log("Server Started on " + port);
});
