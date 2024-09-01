import { logger } from "../index.js";

export const validatePhoneNumber = (req, res, next) => {
    const { phoneNumber } = req.body;
    logger.log("info", "Validating phone number");

    // Basic phone number validation: Check if it has a minimum length of 10 digits
    const phoneNumberRegex = /^\d{10,}$/; // Regular expression to ensure at least 10 digits

    // Validate phone number
    if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
        logger.log("error", "Invalid phone number. Must be at least 10 digits long.");
        return res.status(400).json({ message: 'Invalid phone number. Phone number must be at least 10 digits long.' });
    }

    // If validation passes, proceed to the next middleware
    next();
};
