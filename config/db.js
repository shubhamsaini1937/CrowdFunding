import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI, {
      dbName: "crowdfunding",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("MongoDB Not Connected");
  }
};

export default connectToDB;
