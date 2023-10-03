const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("✅ Connect DB successfully !");
    })
    .catch((err) => {
      console.log("error" + err);
    });
};

module.exports = connectDB;
