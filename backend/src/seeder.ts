import dotenv from 'dotenv';
import Project from './models/Project';
import User from './models/User';
import connectDB from './config/db';

dotenv.config();

const projectsData = [
  {
    title: 'Smart Irrigation Management System',
    description: 'An IoT-based system for optimizing water usage in agriculture through automated monitoring and control.',
    tech: ['React', 'Node.js', 'MongoDB', 'ESP32'],
    features: [
      'User authentication',
      'Real-time sensor monitoring',
      'Automatic irrigation',
      'Dashboard',
      'Notifications'
    ],
    githubUrl: 'https://github.com/belstyilkal-123/smart-irrigation-system',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Stadium Management System',
    description: 'A comprehensive database-driven application for managing stadium bookings and operations.',
    tech: ['MySQL', 'Java', 'Stored Procedures', 'Triggers'],
    features: [
      'Booking management',
      'Admin dashboard',
      'Stored procedures',
      'Database triggers'
    ],
    githubUrl: 'https://github.com/belstyilkal-123/stadium-management-db',
    imageUrl: 'https://images.unsplash.com/photo-1508973378520-5d9b43cfd999?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Student Dormitory Management System',
    description: 'A management system designed to streamline student housing allocation and tracking.',
    tech: ['PHP', 'MySQL', 'HTML/CSS'],
    features: [
      'Student allocation',
      'Room management',
      'Reports',
      'Database integration'
    ],
    githubUrl: 'https://github.com/belstyilkal-123/dormitory-management',
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'EthioSearch',
    description: 'An information retrieval engine designed to process and search bilingual English-Amharic documents.',
    tech: ['Python', 'Information Retrieval', 'NLP'],
    features: [
      'English-Amharic information retrieval',
      'Search ranking',
      'Document preprocessing'
    ],
    githubUrl: 'https://github.com/belstyilkal-123/ethiosearch-engine',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  }
];

const defaultAdmin = {
  name: process.env.ADMIN_NAME || 'Portfolio Admin',
  email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
  password: process.env.ADMIN_PASSWORD || 'Admin1234',
  isAdmin: true,
};

const importData = async () => {
  try {
    await connectDB();

    await Project.deleteMany();
    await Project.insertMany(projectsData);
    console.log('Sample projects imported.');

    const existingAdmin = await User.findOne({ email: defaultAdmin.email });
    if (existingAdmin) {
      console.log(`Admin user already exists: ${defaultAdmin.email}`);
    } else {
      await User.create(defaultAdmin);
      console.log(`Admin user created: ${defaultAdmin.email}`);
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
