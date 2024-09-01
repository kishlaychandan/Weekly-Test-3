import { logger } from "../index.js"; 

export const validateNames = (req, res, next) => {
    const { firstName, lastName } = req.body;
    logger.log("info", "Validating first name and last name");

    // Function to check if the first letter is capitalized
    const isCapitalized = (name) => /^[A-Z]/.test(name);

    // Check if firstName and lastName are provided and capitalized
    if (!firstName || !isCapitalized(firstName)) {
        logger.log("error", "Invalid first name. The first letter must be capitalized.");
        return res.status(400).json({ message: 'Invalid first name. The first letter must be capitalized.' });
    }

    if (!lastName || !isCapitalized(lastName)) {
        logger.log("error", "Invalid last name. The first letter must be capitalized.");
        return res.status(400).json({ message: 'Invalid last name. The first letter must be capitalized.' });
    }

    // If both validations pass, proceed to the next middleware
    next();
};
