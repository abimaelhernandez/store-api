require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const connectFunc = async () => {
  const dbURI = process.env.MONGO_URI;
  try {
    await connectDB(dbURI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log(`Successfully connected to MongoDB and imported products.json data.`);
    process.exit(0);
  } catch (error) {
   console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

connectFunc();