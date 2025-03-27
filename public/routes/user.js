const express = require("express");
const router = express.Router();
const User = require("../../models/user.js");
const passport = require("passport");



router.route("/signup")
.get((req, res) => {  // Signup Routes
    res.render("auth/signup");
})
.post(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to JourneyStay!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

// Login Routes
router.route("/login")
.get((req, res) => {
    res.render("auth/login"); // Remove leading slash
})
.post((req, res, next) => {
        // Save returnTo URL before passport authentication
        const returnTo = req.session.returnTo;
        
        passport.authenticate("local", (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { 
                req.flash("error", "Invalid username or password");
                return res.redirect("/login"); 
            }
            
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                
                req.flash("success", "Welcome back!");
                const redirectUrl = returnTo || "/listings";
                // Clean up
                delete req.session.returnTo;
                
                res.redirect(redirectUrl);
            });
        })(req, res, next);
    }
);

// Logout Route
router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    });
});

module.exports = router;