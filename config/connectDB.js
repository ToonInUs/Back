const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect(
      process.env.DATABASE_URI /*{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}*/
    )
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = connectDB;
