import express from 'express';
import Hospital from '../models/Hospital.js';

const router = express.Router();

// GET /api/hospitals/count
router.get('/count', async (req, res) => {
    try {
        const count = await Hospital.countDocuments();
        res.json({
            success: true,
            totalHospitals: count
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/hospitals/search
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            const hospitals = await Hospital.find();
            return res.json({ success: true, count: hospitals.length, query: "", hospitals });
        }

        const filtered = await Hospital.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { specialization: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } }
            ]
        });

        res.json({
            success: true,
            count: filtered.length,
            query,
            hospitals: filtered
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/hospitals/:id
router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (hospital) {
            res.json({ success: true, hospital });
        } else {
            res.status(404).json({ success: false, message: `Hospital not found with id: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/hospitals
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }

        const hospitals = await Hospital.find(query);
        res.json({
            success: true,
            count: hospitals.length,
            hospitals
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
