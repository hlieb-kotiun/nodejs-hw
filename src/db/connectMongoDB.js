import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log('✅ MongoDB connection established successfully');

    mongoose.syncIndexes();
  } catch (error) {
    console.error('❌ MongoDB connection failed: ', error.message);
    process.exit(1);
  }
};
