import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// GET /api/doctors/count
router.get('/count', async (req, res) => {
    try {
        const { hospitalId } = req.query;
        let query = {};
        if (hospitalId) {
            query.hospitalId = hospitalId;
        }

        const count = await Doctor.countDocuments(query);
        res.json({
            success: true,
            totalDoctors: count
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/doctors/search
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            const doctors = await Doctor.find();
            return res.json({ success: true, count: doctors.length, query: "", doctors });
        }

        const filtered = await Doctor.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { specialization: { $regex: query, $options: 'i' } }
            ]
        });

        res.json({
            success: true,
            count: filtered.length,
            query,
            doctors: filtered
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/doctors/hospital/:hospitalId
router.get('/hospital/:hospitalId', async (req, res) => {
    try {
        const doctors = await Doctor.find({ hospitalId: req.params.hospitalId });
        res.json({
            success: true,
            count: doctors.length,
            hospitalId: req.params.hospitalId,
            doctors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/doctors/:id
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            res.json({ success: true, doctor });
        } else {
            res.status(404).json({ success: false, message: `Doctor not found with id: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/doctors
router.get('/', async (req, res) => {
    try {
        const { hospitalId, specialization } = req.query;
        let query = {};

        if (hospitalId) {
            query.hospitalId = hospitalId;
        } else if (specialization) {
            query.specialization = { $regex: specialization, $options: 'i' };
        }

        const doctors = await Doctor.find(query);
        res.json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
