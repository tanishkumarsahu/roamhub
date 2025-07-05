const mongoose = require("mongoose");
const intiData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();

// Use the MongoDB Atlas URI from environment variables
const MONGO_URL = process.env.MONGODB_URI;

main()
  .then(() => {
    console.log("Connection is established with MongoDB Atlas");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Existing data cleared");

    await Listing.insertMany(intiData.data);
    console.log("Data was initialized successfully in MongoDB Atlas");

    // Close the connection after initialization
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDB();
