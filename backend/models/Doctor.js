import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String },
    hospital: { type: String },
    phone: { type: String },
    availability: { type: String },
    fees: { type: Number },
    rating: { type: Number, default: 4.5 },
    image: { type: String },
    biography: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
