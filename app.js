if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Models
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

// Initialize express app
const app = express();

// Utils
const wrapAsync = require("./utils/wrapAsync.js");

// Database Configuration
const dbUrl = process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/JourneyStay";

async function connectDB() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connection successful");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}

connectDB();

// View Configuration
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));

// Session Store Configuration
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SESSION_SECRET },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in Mongo session store:", err);
});

// Session Configuration
app.use(session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}));

// Flash Configuration
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Debugging middleware for requests
app.use((req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
});

// Global Middleware for Templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes - Import after middleware is set up
const listingRouter = require("./public/routes/listings.js");
const userRouter = require("./public/routes/user.js");

// Home Route - Fix for "Can't find / on the server!"
app.get("/", (req, res) => {
    res.render("home");  // Ensure 'views/home.ejs' exists
});

// Routes Configuration
app.use("/", userRouter);
app.use("/listings", listingRouter);

app.get('/special-deals', (req, res) => {
    res.render('listings/special-deals'); 
});

app.get('/pop-dest', (req, res) => {
    res.render('listings/pop-dest'); 
});

app.get('/uni-dest', (req, res) => {
    res.render('listings/uni-dest');  
});

app.get('/profile', (req, res) => {
    res.render('listings/profile');  
});

app.get('/settings', (req, res) => {
    res.render('listings/settings');  
});

app.get('/my-bookings', (req, res) => {
    res.render('listings/my-bookings');  
});

// 404 Handler for Invalid Routes
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server!`);
    error.status = 404;
    next(error);
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("Error caught by global handler:", err);

    let { status = 500, message = "Something went wrong!" } = err;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        status = 404;
        message = "Resource not found - Invalid ID format";
        req.flash("error", message);
        return res.redirect("/listings");
    }

    if (err.message && typeof err.message === 'string' && err.message.includes("Listing not found")) {
        req.flash("error", err.message);
        return res.redirect("/listings");
    }

    res.status(status).render("error.ejs", { error: err });
});

// Server Configuration
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
