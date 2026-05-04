const mongoose = require("mongoose")
async function connectDB() {
    const remoteUri = process.env.MONGO_URI;
    const fallbackUri = `mongodb://127.0.0.1:27017/skillgap`;
    const uriToUse = remoteUri || fallbackUri;

    try {
        await mongoose.connect(uriToUse);
        console.log("MongoDB connected to:", uriToUse);
        return true;
    } catch (error) {
        console.error("MongoDB connection failed for", uriToUse, ":", error.message || error);
        console.error("If you intended to use Atlas (mongodb+srv) ensure network/DNS allows SRV lookups and MONGO_URI is correct.");
        // Don't exit the process - return false so the caller can decide what to do.
        return false;
    }
}

module.exports = connectDB
