require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const User = require('./model/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@travlgo.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new User({
      name: 'Super Admin',
      email: 'admin@travlgo.com',
      password: 'Admin@123',
      role: 'admin',
      isVerified: true,
    });

    await admin.save();
    console.log('Admin user created successfully: admin@travlgo.com / Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
