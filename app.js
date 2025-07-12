// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");


// Models
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

// Initialize Express App
const app = express();

// Utility Functions
const wrapAsync = require("./utils/wrapAsync.js");

// Database Configuration
const dbUrl = process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/JourneyStay";

async function connectDB() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database connection successful");
    } catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1);
    }
}

connectDB();

// View Engine Configuration
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Session Store Configuration
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SESSION_SECRET },
    touchAfter: 24 * 3600, // Reduce writes to DB
});

store.on("error", (err) => {
    console.log("❌ Error in Mongo session store:", err);
});

// Session Configuration
app.use(
    session({
        store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

// Flash Messages
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Debugging Middleware
app.use((req, res, next) => {
    console.log(`🔹 ${req.method} ${req.originalUrl}`);
    next();
});

// Global Middleware for Templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/search", wrapAsync(async (req, res) => {
  const query = req.query.query;
  
  // If no query provided, redirect to listings
  if (!query || query.trim() === '') {
    req.flash("error", "Please enter a search term");
    return res.redirect("/listings");
  }

  try {
    console.log(`Searching for: "${query}"`);

    // Search in both title and location.address fields
    const listings = await Listing.find({
      $or: [
        { title: { $regex: new RegExp(query.trim(), "i") } },
        { "location.address": { $regex: new RegExp(query.trim(), "i") } }
      ]
    });

    console.log(`Found ${listings.length} listings for search: "${query}"`);

    // Render the same index template with search context
    res.render("listings/index", { 
      listings,
      searchQuery: query.trim(),
      isSearchResult: true
    });
    
  } catch (error) {
    console.error("Search error:", error);
    req.flash("error", "An error occurred while searching. Please try again.");
    res.redirect("/listings");
  }
}));



// Routes
const listingRouter = require("./public/routes/listings.js");
const userRouter = require("./public/routes/user.js");

// Home Route
app.get("/", (req, res) => {
    res.render("home"); // Ensure 'views/home.ejs' exists
});

// Routes Configuration
app.use("/", userRouter);
app.use("/listings", listingRouter);

// Additional Pages
app.get("/special-deals", (req, res) => res.render("listings/special-deals"));
app.get("/pop-dest", (req, res) => res.render("listings/pop-dest"));
app.get("/uni-dest", (req, res) => res.render("listings/uni-dest"));
app.get("/profile", (req, res) => res.render("listings/profile"));
app.get("/settings", (req, res) => res.render("listings/settings"));
app.get("/my-bookings", (req, res) => res.render("listings/my-bookings"));


// Add this debug middleware to your app.js to see all registered routes
// Place this RIGHT AFTER your route definitions

app.use((req, res, next) => {
    console.log(`🔍 Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

// Also add this to list all registered routes (for debugging)
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(`📍 Registered route: ${Object.keys(r.route.methods)} ${r.route.path}`);
  }
});

// If you want to see what routes are available, add this temporary route:
app.get("/debug-routes", (req, res) => {
    const routes = [];
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            routes.push({
                method: Object.keys(r.route.methods),
                path: r.route.path
            });
        }
    });
    res.json(routes);
});

// Test your search route manually by visiting: http://localhost:10000/debug-routes


// 404 Handler
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.status = 404;
    next(error);
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Global Error Handler:", err);

    let { status = 500, message = "Something went wrong!" } = err;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        status = 404;
        message = "Resource not found - Invalid ID format";
        req.flash("error", message);
        return res.redirect("/listings");
    }

    if (err.message && typeof err.message === "string" && err.message.includes("Listing not found")) {
        req.flash("error", err.message);
        return res.redirect("/listings");
    }

    res.status(status).render("error.ejs", { error: err });
});


// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
