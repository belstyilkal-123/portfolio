import mongoose from 'mongoose';

const statisticSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'Code2' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Statistic = mongoose.model('Statistic', statisticSchema);
export default Statistic;
