const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoConnect = async (URI) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in MongoDB Connection =>", error.message);
    process.exit(1);
  }
};

module.exports = mongoConnect;
