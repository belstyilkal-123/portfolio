import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Experience from './src/models/Experience';
import Education from './src/models/Education';
import connectDB from './src/config/db';

dotenv.config();

const experienceData = [
  {
    role: "Networking Intern",
    company: "Current Internship",
    timeline: "Present",
    description: "Gaining hands-on experience in network configuration, troubleshooting, and infrastructure management.",
    icon: "Briefcase"
  }
];

const educationData = [
  {
    school: "Bahir Dar University",
    degree: "BSc in Information Technology",
    timeline: "2023 - Present",
    description: "Third-year IT student focusing on software development, databases, networking, and IoT.",
    icon: "GraduationCap"
  }
];

const run = async () => {
  await connectDB();
  await Experience.deleteMany();
  await Experience.insertMany(experienceData);
  console.log('✅ Experience seeded');
  await Education.deleteMany();
  await Education.insertMany(educationData);
  console.log('✅ Education seeded');
  process.exit(0);
};

run();
