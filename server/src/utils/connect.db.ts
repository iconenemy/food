import mongoose from 'mongoose';

async function connectDB () {
    const mongoURL = process.env.MONGO_URI as string
    try {
        await mongoose.connect(mongoURL)
        console.log('Success connection to MongoDB')
    } catch (error) {
        console.error(`Could not connect to MongoDB. Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB
