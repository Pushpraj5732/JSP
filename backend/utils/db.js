import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sanjeevani';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.warn('⚠️  Server will continue running. Retrying DB connection in 10s...');
        setTimeout(connectDB, 10000);
    }
};

export default connectDB;
