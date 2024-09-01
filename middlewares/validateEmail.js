import { logger } from "../index.js"; 

export const validateEmailAddress = (req, res, next) => {
    const { email } = req.body;
    logger.log("info", "Validating email address");

    // Updated regex to check if email contains "@" and has a proper structure
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email address
    if (!email || !emailRegex.test(email)) {
        logger.log("error", "Invalid email address. Email must contain '@' and a valid domain.");
        return res.status(400).json({ message: 'Invalid email address. Email must contain "@" and a valid domain.' });
    }

    // If validation passes, proceed to the next middleware
    next();
};
