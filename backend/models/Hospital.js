import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    beds: { type: Number, default: 0 },
    specialization: { type: [String] },
    rating: { type: Number, default: 4.5 },
    image: { type: String },
    category: { type: String, enum: ['general', 'ayush'], default: 'general' },
    source: { type: String },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    createdAt: { type: Date, default: Date.now }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
