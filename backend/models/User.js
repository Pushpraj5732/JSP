import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'hospital', 'admin'], default: 'patient' },
    phone: { type: String },
    age: { type: Number },
    gender: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
