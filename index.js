import express from 'express';
import winston from "winston";
import dotenv from "dotenv";
import { validatePhoneNumber } from './middlewares/validatePhoneNumber.js';
import { validatePassword } from './middlewares/validatePassword.js';
import { validateEmailAddress } from './middlewares/validateEmail.js';
import { validateNames } from './middlewares/validateName.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            (data) => `${data.timestamp} ${data.level}: ${data.message}`
        )
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" }),
    ],
});

app.use((req, res, next) => {
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    logger.log("debug", "this is a message");
    res.send('Hello, World!');
});

app.post('/register-user',
    validateNames,
    validateEmailAddress,
    validatePassword,
    validatePhoneNumber,
    (req, res) => {
        logger.log("info", "Register user is invoked");
        res.status(200).json({ message: "User is registered successfully!" });
    }
);

app.put('/update-user-profile',
    validateNames,
    validateEmailAddress,
    validatePassword,
    validatePhoneNumber,
    (req, res) => {
        logger.log("info", "Update user profile is invoked");
        res.status(200).json({ message: "User profile is updated successfully!" });
    }
);

// DELETE endpoint to remove a user profile
app.delete('/delete-user-profile',
    validateNames,
    validateEmailAddress,
    validatePassword,
    validatePhoneNumber,
    (req, res) => {
        logger.log("info", "Delete user profile is invoked");
        res.status(200).json({ message: "User profile is deleted successfully!" });
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});