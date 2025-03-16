const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log("DB connected");
    }
    catch(err){
        console.error("Error occured", err);
        process.exit(1)
    }
}

module.exports = connectDB;