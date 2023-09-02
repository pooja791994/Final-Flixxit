const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);

mongoose.connect("mongodb+srv://admin:admin@cluster0.dqm8jgk.mongodb.net/flixxit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
 

app.listen(PORT, () => {
  console.log(`server started on port number ${PORT}`);
});
