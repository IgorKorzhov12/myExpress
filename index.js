require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
const app = express();
const routerUser = require("./Routes/user-rote");


app.use(express.json());
app.use(cookieParser());
app.use("/api", routerUser);

const start = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server was started on PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();

