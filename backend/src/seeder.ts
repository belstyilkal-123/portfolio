import dotenv from 'dotenv';
import Project from './models/Project';
import User from './models/User';
import Skill from './models/Skill';
import Blog from './models/Blog';
import Testimonial from './models/Testimonial';
import Setting from './models/Setting';
import connectDB from './config/db';

dotenv.config();

// ─── PROJECTS ──────────────────────────────────────────────────────────────
const projectsData = [
  {
    title: 'Smart Irrigation Management System',
    description: 'An IoT-based system for optimizing water usage in agriculture through automated monitoring and control.',
    tech: ['React', 'Node.js', 'MongoDB', 'ESP32'],
    features: ['User authentication', 'Real-time sensor monitoring', 'Automatic irrigation', 'Dashboard', 'Notifications'],
    githubUrl: 'https://github.com/belstyilkal-123/smart-irrigation-system',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Stadium Management System',
    description: 'A comprehensive database-driven application for managing stadium bookings and operations.',
    tech: ['MySQL', 'Java', 'Stored Procedures', 'Triggers'],
    features: ['Booking management', 'Admin dashboard', 'Stored procedures', 'Database triggers'],
    githubUrl: 'https://github.com/belstyilkal-123/stadium-management-db',
    imageUrl: 'https://images.unsplash.com/photo-1508973378520-5d9b43cfd999?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Student Dormitory Management System',
    description: 'A management system designed to streamline student housing allocation and tracking.',
    tech: ['PHP', 'MySQL', 'HTML/CSS'],
    features: ['Student allocation', 'Room management', 'Reports', 'Database integration'],
    githubUrl: 'https://github.com/belstyilkal-123/dormitory-management',
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'EthioSearch',
    description: 'An information retrieval engine designed to process and search bilingual English-Amharic documents.',
    tech: ['Python', 'Information Retrieval', 'NLP'],
    features: ['English-Amharic information retrieval', 'Search ranking', 'Document preprocessing'],
    githubUrl: 'https://github.com/belstyilkal-123/ethiosearch-engine',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  }
];

// ─── SKILLS ────────────────────────────────────────────────────────────────
const skillsData = [
  // Frontend
  { name: 'React', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 85, yearsOfExperience: 2, order: 1 },
  { name: 'HTML', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', proficiency: 95, yearsOfExperience: 3, order: 2 },
  { name: 'CSS', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', proficiency: 90, yearsOfExperience: 3, order: 3 },
  // Backend
  { name: 'Node.js', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', proficiency: 80, yearsOfExperience: 2, order: 4 },
  { name: 'Express.js', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', proficiency: 80, yearsOfExperience: 2, order: 5 },
  { name: 'JavaScript', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 85, yearsOfExperience: 3, order: 6 },
  { name: 'Java', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', proficiency: 80, yearsOfExperience: 2, order: 7 },
  { name: 'Python', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 75, yearsOfExperience: 2, order: 8 },
  { name: 'PHP', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', proficiency: 70, yearsOfExperience: 1, order: 9 },
  { name: 'C++', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', proficiency: 65, yearsOfExperience: 1, order: 10 },
  // Database
  { name: 'MongoDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', proficiency: 75, yearsOfExperience: 2, order: 11 },
  { name: 'MySQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', proficiency: 80, yearsOfExperience: 2, order: 12 },
  // DevOps / Tools
  { name: 'Git & GitHub', category: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', proficiency: 85, yearsOfExperience: 3, order: 13 },
  { name: 'VS Code', category: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', proficiency: 95, yearsOfExperience: 3, order: 14 },
  { name: 'IntelliJ IDEA', category: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg', proficiency: 80, yearsOfExperience: 2, order: 15 },
  { name: 'MongoDB Compass', category: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', proficiency: 85, yearsOfExperience: 2, order: 16 },
  { name: 'Postman', category: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', proficiency: 80, yearsOfExperience: 2, order: 17 },
  // Other / IoT
  { name: 'ESP32', category: 'other', icon: '', proficiency: 80, yearsOfExperience: 1, order: 18 },
  { name: 'Arduino IDE', category: 'other', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', proficiency: 85, yearsOfExperience: 2, order: 19 },
  { name: 'Cisco Packet Tracer', category: 'devops', icon: '', proficiency: 75, yearsOfExperience: 1, order: 20 },
];

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────
const testimonialsData = [
  {
    name: 'Dr. Amare Tessema',
    role: 'Lecturer & Project Supervisor',
    company: 'Bahir Dar University',
    avatar: '',
    quote: 'Belstie is one of the most dedicated students I have supervised. His Smart Irrigation project demonstrated exceptional problem-solving skills and a deep understanding of both hardware and software integration. He is a natural engineer.',
    rating: 5,
    isVisible: true,
    order: 1,
  },
  {
    name: 'Yohannes Getachew',
    role: 'Senior Software Engineer',
    company: 'Freelance Collaborator',
    avatar: '',
    quote: 'I worked with Belstie on a web project and was impressed by the quality of his React and Node.js code. He is self-driven, picks up new concepts quickly, and always delivers clean, maintainable work.',
    rating: 5,
    isVisible: true,
    order: 2,
  },
  {
    name: 'Mekdes Alemu',
    role: 'IT Department Head',
    company: 'Networking Internship Host',
    avatar: '',
    quote: 'During his internship, Belstie showed great professionalism and technical curiosity. He quickly adapted to real-world networking challenges and contributed meaningfully to our infrastructure work.',
    rating: 5,
    isVisible: true,
    order: 3,
  },
  {
    name: 'Naol Bekele',
    role: 'Classmate & Team Member',
    company: 'Bahir Dar University',
    avatar: '',
    quote: 'Working with Belstie on group projects is always a great experience. He takes ownership, leads with clarity, and always goes the extra mile to make sure the product is polished and functional.',
    rating: 5,
    isVisible: true,
    order: 4,
  },
];

// ─── BLOG POSTS ────────────────────────────────────────────────────────────
const blogData = [
  {
    title: 'Building a Smart Irrigation System with ESP32 and React',
    slug: 'smart-irrigation-esp32-react',
    content: `## Introduction\n\nIrrigation accounts for 70% of global freshwater usage. In this post, I walk through how I built an IoT-based Smart Irrigation Management System using ESP32, Node.js, MongoDB, and React.\n\n## System Architecture\n\nThe system has three main layers:\n1. **Sensor layer** — ESP32 microcontrollers read soil moisture, temperature, and humidity\n2. **Backend** — Node.js REST API stores readings in MongoDB and triggers irrigation commands\n3. **Frontend** — React dashboard lets users monitor real-time data and set thresholds\n\n## Key Challenges\n\nThe hardest part was reliable WiFi communication between ESP32 and the server in areas with weak signal. I solved this by implementing a local queue on the device that syncs when connectivity is restored.\n\n## Results\n\nIn test conditions, the system reduced water usage by approximately 35% compared to timer-based irrigation. The dashboard made it easy to spot anomalies in sensor data immediately.\n\n## Conclusion\n\nIoT + web development is a powerful combination for solving real agricultural problems. The full source code is available on my GitHub.`,
    excerpt: 'How I built an IoT-based irrigation system using ESP32, Node.js, MongoDB, and React — reducing water usage by 35%.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    categories: ['IoT', 'Web Development'],
    tags: ['ESP32', 'React', 'Node.js', 'MongoDB', 'IoT'],
    readingTime: 5,
    isPublished: true,
  },
  {
    title: 'Why I Chose MongoDB Over MySQL for My Portfolio Backend',
    slug: 'mongodb-vs-mysql-portfolio-backend',
    content: `## The Decision\n\nWhen building my portfolio backend, I had to choose between MongoDB (NoSQL) and MySQL (relational). Here is how I made the decision.\n\n## When MySQL Wins\n\nMySQL is excellent for structured data with clear relationships — like my Stadium Management System, where bookings, teams, and events have strict relational integrity.\n\n## When MongoDB Wins\n\nFor a portfolio CMS, the data shapes change frequently. Projects have different fields, blog posts have tags and categories, settings are key-value pairs. MongoDB's flexible schema made it much faster to iterate.\n\n## What I Learned\n\nThe right database depends on your data model, not on popularity. I now use both — relational databases for structured transactional data, MongoDB for flexible content management.\n\n## Final Thoughts\n\nBoth are excellent tools. Understanding when to use each is what matters most.`,
    excerpt: 'A practical comparison of MongoDB vs MySQL based on my real project experience — and why the data model is the deciding factor.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    categories: ['Backend', 'Databases'],
    tags: ['MongoDB', 'MySQL', 'Backend', 'Database Design'],
    readingTime: 4,
    isPublished: true,
  },
  {
    title: 'My Journey Learning Full-Stack Development as a University Student',
    slug: 'learning-fullstack-as-student',
    content: `## Where It Started\n\nI began programming in my first year at Bahir Dar University with C++. It was frustrating at first, but something clicked once I built my first algorithm that actually solved a real problem.\n\n## The Stack That Changed Everything\n\nDiscovering the MERN stack (MongoDB, Express, React, Node.js) opened up a new world. I could build entire applications — frontend, backend, and database — in one language.\n\n## Challenges of Self-Learning\n\nUniversity teaches fundamentals well, but practical web development required a lot of self-study. YouTube, documentation, and building real projects were my main teachers.\n\n## Projects That Taught Me the Most\n\n- **Smart Irrigation System** — Taught me IoT integration and async programming\n- **EthioSearch** — Taught me NLP, document processing, and Python\n- **This Portfolio** — Taught me professional project structure and deployment\n\n## Advice for Other Students\n\nBuild things. Break things. Read error messages carefully. The best learning happens when you are stuck and figure your way out.`,
    excerpt: 'From C++ fundamentals to building full-stack IoT applications — my honest account of learning software development as a university student.',
    coverImage: 'https://images.unsplash.com/photo-1508973378520-5d9b43cfd999?auto=format&fit=crop&w=1200&q=80',
    categories: ['Career', 'Learning'],
    tags: ['Student', 'Full-Stack', 'Learning', 'Career'],
    readingTime: 6,
    isPublished: true,
  },
];

// ─── SETTINGS ──────────────────────────────────────────────────────────────
const settingsData = [
  { key: 'name', value: 'Belstie Yilkal' },
  { key: 'role', value: 'Software Developer' },
  { key: 'tagline', value: 'Building reliable web and IoT products with clean code, strong architecture, and practical business value.' },
  { key: 'bio', value: 'I am a third-year Information Technology student and software developer from Bahir Dar. I build full-stack applications, backend systems, and IoT solutions with an emphasis on usability, stability, and maintainability.' },
  { key: 'location', value: 'Bahir Dar, Ethiopia' },
  { key: 'github_url', value: 'https://github.com/belstyilkal-123' },
  { key: 'linkedin_url', value: '' },
  { key: 'twitter_url', value: '' },
  { key: 'email', value: 'belstyilkal@gmail.com' },
  { key: 'telegram_url', value: 'https://t.me/manchilot123' },
  { key: 'resume_visible', value: 'true' },
  { key: 'notify_on_message', value: 'true' },
  { key: 'notification_email', value: 'belstyilkal@gmail.com' },
];

// ─── ADMIN USER ────────────────────────────────────────────────────────────
const defaultAdmin = {
  name: process.env.ADMIN_NAME || 'Belstie Yilkal',
  email: process.env.ADMIN_EMAIL || 'belstyilkal@gmail.com',
  password: process.env.ADMIN_PASSWORD || 'Admin1234',
  isAdmin: true,
};

// ─── SEED ──────────────────────────────────────────────────────────────────
const importData = async () => {
  try {
    await connectDB();

    // Projects
    await Project.deleteMany();
    await Project.insertMany(projectsData);
    console.log('✅ Projects seeded');

    // Skills
    await Skill.deleteMany();
    await Skill.insertMany(skillsData);
    console.log('✅ Skills seeded');

    // Testimonials
    await Testimonial.deleteMany();
    await Testimonial.insertMany(testimonialsData);
    console.log('✅ Testimonials seeded');

    // Blog posts
    await Blog.deleteMany();
    await Blog.insertMany(blogData);
    console.log('✅ Blog posts seeded');

    // Settings (upsert each key)
    for (const s of settingsData) {
      await Setting.findOneAndUpdate({ key: s.key }, { value: s.value }, { upsert: true, new: true });
    }
    console.log('✅ Settings seeded');

    // Admin user
    const existingAdmin = await User.findOne({ email: defaultAdmin.email });
    if (existingAdmin) {
      console.log(`ℹ️  Admin user already exists: ${defaultAdmin.email}`);
    } else {
      await User.create(defaultAdmin);
      console.log(`✅ Admin user created: ${defaultAdmin.email}`);
    }

    console.log('\n🎉 All data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeder error: ${error}`);
    process.exit(1);
  }
};

importData();
