import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';
import Appointment from '../models/Appointment.js';
import connectDB from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Doctor.deleteMany({});
        await Hospital.deleteMany({});
        await Appointment.deleteMany({});

        console.log('🗑️  Existing data cleared');

        // 1. Seed Users
        const users = [
            { name: 'Aarav Sharma', email: 'patient@example.com', password: 'password123', role: 'patient' },
            { name: 'Anand General Hospital', email: 'hospital@example.com', password: 'password123', role: 'hospital' },
            { name: 'System Admin', email: 'admin@example.com', password: 'password123', role: 'admin' },
        ];
        const createdUsers = await User.insertMany(users);
        console.log('👤 Users seeded');

        // 2. Seed Hospitals
        const hospitalsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/hospitals_anand.json'), 'utf-8'));
        const hospitalIdMap = {};

        const hospitalsToInsert = hospitalsData.map(h => {
            const hospital = {
                name: h.hospitalName,
                address: h.address,
                phone: h.contactNumber,
                beds: h.beds || 0,
                category: h.category || 'general',
                source: h.source || '',
                specialization: [], // Add if available
                location: {
                    type: 'Point',
                    coordinates: [h.longitude, h.latitude]
                }
            };
            return hospital;
        });

        const createdHospitals = await Hospital.insertMany(hospitalsToInsert);
        createdHospitals.forEach((h, index) => {
            hospitalIdMap[hospitalsData[index].id] = h._id;
        });
        console.log('🏥 Hospitals seeded');

        // 3. Seed Doctors
        const doctorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/doctors.json'), 'utf-8'));
        const doctorIdMap = {};

        const doctorsToInsert = doctorsData.map(d => {
            const hId = (d.hospitalId % 11) + 1;
            const hospitalRef = hospitalsData.find(h => h.id === hId);
            return {
                name: d.name,
                specialization: d.specialization,
                experience: `${d.experience} years`,
                hospital: hospitalRef ? hospitalRef.hospitalName : 'Unknown Hospital',
                phone: d.contactNumber,
                availability: d.availableTime || '9:00 AM - 5:00 PM',
                fees: d.consultationFee,
                hospitalId: hospitalIdMap[hId]
            };
        });

        const createdDoctors = await Doctor.insertMany(doctorsToInsert);
        createdDoctors.forEach((d, index) => {
            doctorIdMap[doctorsData[index].id] = d._id;
        });
        console.log('🩺 Doctors seeded');

        // 4. Seed Appointments
        const appointmentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/appointments.json'), 'utf-8'));
        const appointmentsToInsert = appointmentsData.map(a => {
            return {
                patientName: a.patientName,
                patientEmail: a.patientEmail,
                date: a.appointmentDate,
                time: a.appointmentTime,
                reason: a.symptoms,
                status: a.status.toLowerCase() === 'completed' ? 'confirmed' : 'pending',
                doctorId: doctorIdMap[a.doctorId],
                hospitalId: hospitalIdMap[a.hospitalId],
                userId: createdUsers[0]._id // Map to first user (Aarav) for demo
            };
        });

        await Appointment.insertMany(appointmentsToInsert);
        console.log('📅 Appointments seeded');

        console.log('✅ Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
