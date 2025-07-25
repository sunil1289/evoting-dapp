import mongoose from "mongoose";
import colors from "colors";

// Set strictQuery to suppress the warning
mongoose.set('strictQuery', true);

/**
 * Establishes connection to MongoDB database
 * @returns {Promise} MongoDB connection
 */
const connDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    
    // Set up connection error handler
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`.red.bold);
    });
    
    // Optional: Set up disconnection handler
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected'.yellow);
    });
    
    // Optional: Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination'.yellow);
      process.exit(0);
    });
    
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1); // Exit process on failure
  }
};

export default connDB;