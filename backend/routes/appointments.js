import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// GET /api/appointments/count
router.get('/count', async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status) {
            query.status = { $regex: status, $options: 'i' };
        }

        const count = await Appointment.countDocuments(query);
        res.json({
            success: true,
            totalAppointments: count
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/appointments
router.get('/', async (req, res) => {
    try {
        const { patientEmail, doctorId, hospitalId } = req.query;
        let query = {};

        if (patientEmail) {
            query.patientEmail = { $regex: patientEmail, $options: 'i' };
        } else if (doctorId) {
            query.doctorId = doctorId;
        } else if (hospitalId) {
            query.hospitalId = hospitalId;
        }

        const appointments = await Appointment.find(query)
            .populate('doctorId')
            .populate('hospitalId');

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/appointments/:id
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('doctorId')
            .populate('hospitalId');

        if (appointment) {
            res.json({ success: true, appointment });
        } else {
            res.status(404).json({ success: false, message: `Appointment not found with id: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/appointments
router.post('/', async (req, res) => {
    try {
        const { patientName, patientEmail, patientContact, doctorId, hospitalId, date, time, reason } = req.body;

        // Basic Validation
        if (!patientName) return res.status(400).json({ success: false, message: "Patient name is required" });
        if (!doctorId) return res.status(400).json({ success: false, message: "Doctor ID is required" });
        if (!hospitalId) return res.status(400).json({ success: false, message: "Hospital ID is required" });
        if (!date) return res.status(400).json({ success: false, message: "Appointment date is required" });
        if (!time) return res.status(400).json({ success: false, message: "Appointment time is required" });

        const newAppointment = await Appointment.create({
            patientName,
            patientEmail,
            patientContact,
            doctorId,
            hospitalId,
            date,
            time,
            reason,
            status: "Scheduled"
        });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: newAppointment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/appointments/:id/status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.query;
        if (!status) {
            return res.status(400).json({ success: false, message: "Status query parameter is required" });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (appointment) {
            res.json({ success: true, message: "Appointment status updated successfully", appointment });
        } else {
            res.status(404).json({ success: false, message: `Appointment not found with id: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/appointments/:id
router.delete('/:id', async (req, res) => {
    try {
        const result = await Appointment.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ success: true, message: "Appointment deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: `Appointment not found with id: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
