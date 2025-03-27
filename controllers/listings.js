//controllers/listing.js
const Listing = require("../models/listing");
const axios = require("axios");
const mapToken= process.env.MAP_TOKEN; // Replace with your API Key
// Show all listings
const index = async (req, res) => {
  try {
    const listings = await Listing.find({});
    console.log("Retrieved listings:", listings);
    res.render("listings/index", { listings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    req.flash("error", "Failed to load listings.");
    return res.redirect("/");
  }
};

// Render new listing form
const renderNewRoute = (req, res) => {
  res.render("listings/new");
};


// Create new listing
const createNewListing = async (req, res) => {
  try {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("Uploaded File:", req.file);

    if (!req.body.listing) {
      req.flash("error", "Invalid form submission.");
      return res.redirect("/listings/new");
    }

    // Get location and country from the form
    const locationString = req.body.listing.location || "";
    const country = req.body.listing.country || "";
    
    // Combine location and country for better geocoding results
    const fullLocation = `${locationString}, ${country}`.trim();
    console.log(`Attempting geocoding for location: ${fullLocation}`);

    // Forward geocoding with LocationIQ
    const geoResponse = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
      params: {
        key: mapToken,
        q: fullLocation,
        format: "json"
      }
    });

    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error("Location not found. Please enter a valid location and country.");
    }

    const { lat, lon } = geoResponse.data[0]; // Extract latitude & longitude
    console.log(`Coordinates of ${fullLocation}: Lat: ${lat}, Lon: ${lon}`);

    // Create a copy of the listing data (to avoid modifying the original)
    const listingData = { ...req.body.listing };
    
    // Remove the original location string (which is a flat value)
    delete listingData.location;
    
    // Create new listing with geocoding data
    const newListing = new Listing({
      ...listingData,
      owner: req.user._id,
      // Add the structured location object
      location: {
        address: fullLocation,
        coordinates: [lon, lat] // GeoJSON format: [longitude, latitude]
      }
    });

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await newListing.save();
    console.log("New listing created successfully!");
    console.log("Location data:", newListing.location);
    req.flash("success", "New Listing Created!");
    return res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", `Failed to create listing: ${err.message}`);
    return res.redirect("/listings/new");
  }
};


// Show listing details
const showListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner");

    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }

    console.log("Showing listing:", listing);
    res.render("listings/show.ejs", { listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
    req.flash("error", "Failed to load listing.");
    return res.redirect("/listings");
  }
};

// Render edit listing form
const editListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.redirect("/listings");

    // Ensure `listing.image` exists before accessing `url`
    const originalImgUrl = listing.image?.url
      ? listing.image.url.replace("/upload", "/upload/w_250")
      : "https://via.placeholder.com/250x300?text=No+Image"; // Default image

    console.log("Passing originalImgUrl:", originalImgUrl); // Debugging

    res.render("listings/edit", { listing, originalImgUrl }); // Pass `originalImgUrl` to EJS
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.redirect("/listings");
  }
};




// Update listing
const updateListing = async (req, res) => {
  try {
    console.log("Updating Listing with Data:", JSON.stringify(req.body, null, 2));
    console.log("Uploaded File:", req.file);
    
    if (!req.body.listing) {
      req.flash("error", "Invalid form submission.");
      return res.redirect(`/listings/${req.params.id}/edit`);
    }
    
    // Find the existing listing
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    
    // Keep a copy of the current image before updating
    const currentImage = { ...listing.image };
    
    // Update listing fields from form
    Object.assign(listing, req.body.listing);
    
    // Only update image if a new file was uploaded
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } else {
      // Restore the original image data
      listing.image = currentImage;
    }
    
    await listing.save();
    req.flash("success", "Successfully updated listing!");
    return res.redirect(`/listings/${listing._id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "Failed to update listing.");
    return res.redirect(`/listings/${req.params.id}/edit`);
  }
};

// Delete listing
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted listing!");
    return res.redirect("/listings");
  } catch (error) {
    console.error("Error deleting listing:", error);
    req.flash("error", "Failed to delete listing.");
    return res.redirect("/listings");
  }
};

module.exports = {
  index,
  renderNewRoute,
  createNewListing,
  showListing,
  editListing,
  updateListing,
  deleteListing
};
