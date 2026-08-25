import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    timeline: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, default: 'GraduationCap' },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);
export default Education;
