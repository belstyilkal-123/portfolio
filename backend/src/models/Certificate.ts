import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
