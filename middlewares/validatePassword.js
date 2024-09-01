import { logger } from "../index.js";

export const validatePassword = (req, res, next) => {
    const { password } = req.body;
    logger.log("info", "validating password");

    // Regular expression to check for at least one special character, one uppercase letter, and one numeric character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    // Validate password
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Invalid password. Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long.' });
    }

    // If validation passes, proceed to the next middleware
    next();
};
 