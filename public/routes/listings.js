// routes/listings.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Added for ObjectId validation
const wrapAsync = require("../../utils/wrapAsync");
const Listing = require("../../models/listing");
const { isLoggedIn, isOwner, validateListings } = require("../../middleware");
const listingController = require("../../controllers/listings");
const multer = require('multer');
const { storage } = require("../../cloudConfig");
const upload = multer({ storage });

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid listing ID");
    return res.redirect("/listings");
  }
  next();
};

router.route("/")
  .get(wrapAsync(listingController.index)) // Show all listings
  .post(
    isLoggedIn,
    upload.single("listingImage"), // Ensure file is uploaded before validation
    validateListings,
    wrapAsync(listingController.createNewListing)
  );

// New listing form
router.get("/new", isLoggedIn, listingController.renderNewRoute);

router.route("/:id")
  .get(
    validateObjectId, // Add ObjectId validation middleware
    wrapAsync(async (req, res, next) => {
      try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
          req.flash("error", "Listing not found or has been removed");
          return res.redirect("/listings");
        }
        return listingController.showListing(req, res, next);
      } catch (err) {
        next(err);
      }
    })
  )
  .post(
    validateObjectId,
    (req, res) => {
      req.flash("error", "Invalid operation. POST requests are not supported for individual listings.");
      return res.redirect("/listings");
    }
  )
  .put(
    isLoggedIn,
    validateObjectId, // Add ObjectId validation middleware
    isOwner,
    validateListings, // Validate before processing file upload
    upload.single("listingImage"),
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    validateObjectId, // Add ObjectId validation middleware
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

// Edit listing form
router.get(
  "/:id/edit",
  isLoggedIn,
  validateObjectId, // Add ObjectId validation middleware
  isOwner,
  wrapAsync(async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        req.flash("error", "Listing not found or has been removed");
        return res.redirect("/listings");
      }
      return listingController.editListing(req, res, next);
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;