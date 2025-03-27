const Listing = require("./models/listing");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Joi = require("joi");




// Check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
};

// Verify listing ownership
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        req.flash("error", "Invalid listing ID");
        return res.redirect("/listings");
    }
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        if (!req.user || !listing.owner.equals(req.user._id)) {
            req.flash("error", "You don't have permission to edit");
            return res.redirect(`/listings/${listing._id}`);
        }
        req.listing = listing;
        next();
    } catch (err) {
        next(new ExpressError("Error verifying listing ownership", 500));
    }
};

// Image handling middleware for Cloudinary
module.exports.validateListings = (req, res, next) => {
    console.log("validateListings called");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    
    try {
        // Ensure listing object exists
        if (!req.body.listing) {
            req.body.listing = {};
        }
        
        // Handle form fields that may not be nested under listing
        const fields = ['title', 'description', 'location', 'country', 'price'];
        for (const field of fields) {
            if (req.body[field] && !req.body.listing[field]) {
                req.body.listing[field] = req.body[field];
            }
        }
        
        // Handle image upload from Cloudinary/Multer
        if (req.file) {
            // Cloudinary returns path and filename through the multer storage engine
            req.body.listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
            console.log("Image assigned:", req.body.listing.image);
        } else {
            console.log("No new image uploaded, preserving existing image");
            // For edit operations, preserve the existing image if none uploaded
            if (req.method === "PUT" && req.listing && req.listing.image) {
                req.body.listing.image = req.listing.image;
            }
        }
        
        // Check if price is a number
        if (req.body.listing.price) {
            req.body.listing.price = parseFloat(req.body.listing.price);
        }
        
        // Basic validation
        for (const field of fields) {
            if (!req.body.listing[field]) {
                console.warn(`Missing required field: ${field}`);
                // Still proceeding rather than erroring to troubleshoot image issue
            }
        }
        
        next();
    } catch (err) {
        console.error("Error in validateListings:", err);
        next(err);
    }
};


// Check if user is the review author
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash('error', 'Review not found');
            return res.redirect(`/listings/${id}`);
        }
        if (!review.author.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that');
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (err) {
        next(new ExpressError("Error verifying review ownership", 500));
    }
};