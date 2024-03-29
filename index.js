//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const csvRoute = require("./routes/csvRoute");
const cors = require("cors");

mongoose.set("strictQuery", true);
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000 || process.env.PORT;
mongoose
  .connect(process.env.DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/recruiters", csvRoute);


app.listen(port, () => {
  console.log(`Sever running at ${port}`);
});
