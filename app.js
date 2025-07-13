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

// ADDED: Handle Chrome DevTools requests early (before logging)
app.use((req, res, next) => {
    // Silently handle Chrome DevTools and other browser requests
    if (req.path.includes('/.well-known/') || 
        req.path.includes('/favicon.ico') ||
        req.path.includes('chrome-extension://') ||
        req.path === '/robots.txt' ||
        req.path === '/sitemap.xml') {
        return res.status(404).end();
    }
    next();
});

// UPDATED: Debugging Middleware (now filters out unwanted requests)
app.use((req, res, next) => {
    // Only log actual application requests
    if (!req.path.includes('/.well-known/') && 
        !req.path.includes('/favicon.ico') &&
        !req.path.includes('chrome-extension://')) {
        console.log(`🔹 ${req.method} ${req.originalUrl}`);
    }
    next();
});

// Global Middleware for Templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
const userRouter = require("./public/routes/user.js");

// Home Route
app.get("/", (req, res) => {
    res.render("home"); // Ensure 'views/home.ejs' exists
});

// FIXED: Listings route with integrated search functionality
app.get("/listings", wrapAsync(async (req, res) => {
    const searchTerm = req.query.search; // Match the frontend parameter name
    let listings;
    
    try {
        if (searchTerm && searchTerm.trim() !== '') {
            console.log(`🔍 Searching for: "${searchTerm}"`);
            
            // Search in multiple fields
            listings = await Listing.find({
                $or: [
                    { title: { $regex: new RegExp(searchTerm.trim(), "i") } },
                    { description: { $regex: new RegExp(searchTerm.trim(), "i") } },
                    { location: { $regex: new RegExp(searchTerm.trim(), "i") } },
                    { country: { $regex: new RegExp(searchTerm.trim(), "i") } },
                    { "location.address": { $regex: new RegExp(searchTerm.trim(), "i") } }
                ]
            });
            
            console.log(`✅ Found ${listings.length} listings for: "${searchTerm}"`);
        } else {
            // Show all listings if no search term
            listings = await Listing.find({});
            console.log(`✅ Showing all ${listings.length} listings`);
        }
        
        res.render("listings/index", { 
            listings,
            search: searchTerm || '', // Pass search term to template
            isSearchResult: !!searchTerm
        });
        
    } catch (error) {
        console.error("❌ Error fetching listings:", error);
        req.flash("error", "An error occurred while loading listings. Please try again.");
        res.render("listings/index", { 
            listings: [],
            search: '',
            isSearchResult: false
        });
    }
}));

// Keep your existing search route as backup (optional)
app.get("/search", wrapAsync(async (req, res) => {
    const query = req.query.query || req.query.search;
    
    // Redirect to listings with search parameter
    if (query && query.trim() !== '') {
        return res.redirect(`/listings?search=${encodeURIComponent(query.trim())}`);
    } else {
        return res.redirect("/listings");
    }
}));

// Import and use listing routes (but exclude the main /listings route since we defined it above)
const listingRouter = require("./public/routes/listings.js");
app.use("/listings", listingRouter);

// Routes Configuration
app.use("/", userRouter);

// Additional Pages
app.get("/special-deals", (req, res) => res.render("listings/special-deals"));
app.get("/pop-dest", (req, res) => res.render("listings/pop-dest"));
app.get("/uni-dest", (req, res) => res.render("listings/uni-dest"));
app.get("/profile", (req, res) => res.render("listings/profile"));
app.get("/settings", (req, res) => res.render("listings/settings"));
app.get("/my-bookings", (req, res) => res.render("listings/my-bookings"));

// REMOVED: Debug middleware that was causing duplicate logging
// The original debug middleware is now handled above before the Chrome DevTools filter

// OPTIONAL: Route debugging (comment out in production)
if (process.env.NODE_ENV !== 'production') {
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            console.log(`📍 Registered route: ${Object.keys(r.route.methods)} ${r.route.path}`);
        }
    });

    // Debug routes endpoint
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
}

// UPDATED: Better 404 handler that completely ignores Chrome DevTools requests
app.all("*", (req, res, next) => {
    // These requests should have been handled earlier, but just in case
    if (req.originalUrl.includes('/.well-known/') || 
        req.originalUrl.includes('/favicon.ico') ||
        req.originalUrl.includes('chrome-extension://') ||
        req.originalUrl === '/robots.txt' ||
        req.originalUrl === '/sitemap.xml') {
        return res.status(404).end();
    }
    
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.status = 404;
    next(error);
});

// UPDATED: Error Handler with Chrome DevTools filtering
app.use((err, req, res, next) => {
    // Don't log errors for Chrome DevTools requests
    if (req.originalUrl.includes('/.well-known/') || 
        req.originalUrl.includes('/favicon.ico') ||
        req.originalUrl.includes('chrome-extension://')) {
        return res.status(404).end();
    }

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