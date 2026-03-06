import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    patientName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
