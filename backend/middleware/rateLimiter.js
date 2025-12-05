const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: {
        status: "error",
        message: "Previse pokusaja logovanja. Pokusajte ponovo za 1 minut."
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: {
        status: "error",
        message: "To many requests"      
    },
    standardHeaders: true,
    legacyHeaders: true,
});

module.exports = { loginLimiter, Limiter };