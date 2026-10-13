import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (error.message && error.message.includes('whitelist')) {
      console.error('\n👉 ACTION REQUIRED: Whitelist your current IP address in MongoDB Atlas (Network Access > Add IP Address > 0.0.0.0/0 or Current IP).\n');
    }
    process.exit(1);
  }
};

export default connectDB;
