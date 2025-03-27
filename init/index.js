const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

// Database connection
const mongo_url = "mongodb://localhost:27017/JourneyStay";

async function main() {
    try {
        await mongoose.connect(mongo_url);
        console.log("Database connection successful");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}

// Function to initialize the database
const initdb = async () => {
    try {
        // Clear the existing data
        await Listing.deleteMany({});
        console.log("Existing listings cleared");

        // Add the specified owner ID to each listing
        const listingsWithOwner = initdata.data.map(listing => ({
            ...listing,
            owner: req.user._id    // Add the owner ID from the logged-in user

        }));

        // Insert the new data
        await Listing.insertMany(listingsWithOwner);
        console.log("Data was initialized successfully");

    } catch (err) {
        console.error("Error during database initialization:", err);
    } finally {
        mongoose.connection.close();
    }
};

// Run the main process
(async () => {
    await main();
    await initdb();
})();