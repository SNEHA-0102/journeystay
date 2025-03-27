//models/listing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "No description provided.",
        },
        image: {
            url: String,
            filename: String,
        },
        price: {
            type: Number,
            min: [0, "Price cannot be negative"],
            required: true
        },
        location: {
            address: String,
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere' // Optional: if you want to support geo queries
            }
        },
        country: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]
    },
    { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;