import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
        }

        const user = await User.findOne({ email, password, role });

        if (user) {
            // Exclude password from response
            const userObj = user.toObject();
            delete userObj.password;
            res.json({
                success: true,
                message: 'Login successful',
                user: userObj
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: userObj
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
