"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Experience_1 = __importDefault(require("./src/models/Experience"));
const Education_1 = __importDefault(require("./src/models/Education"));
const db_1 = __importDefault(require("./src/config/db"));
dotenv_1.default.config();
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
    await (0, db_1.default)();
    await Experience_1.default.deleteMany();
    await Experience_1.default.insertMany(experienceData);
    console.log('✅ Experience seeded');
    await Education_1.default.deleteMany();
    await Education_1.default.insertMany(educationData);
    console.log('✅ Education seeded');
    process.exit(0);
};
run();
