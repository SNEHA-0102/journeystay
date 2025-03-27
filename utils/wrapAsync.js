// utils/wrapAsync.js

// Utility function to wrap async route handlers
// Catches any errors in async route handlers and passes them to Express error handling middleware
const wrapAsync = (fn) => {
    return (req, res, next) => {
        // Call the async function and catch any errors
        fn(req, res, next).catch(next);
    };
};

module.exports = wrapAsync;