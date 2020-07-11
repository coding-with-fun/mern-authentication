const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Set up Express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started at port: ${PORT}`));

// MongoDB setup
if (process.env.MONGODB_CONNECTION_STRING) {
  mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log(`MongoDB connection established!!`);
    }
  );
} else {
  console.log("Please provide a valid MONGODB_CONNECTION_STRING!!");
}
