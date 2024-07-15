import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () =>{
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already Connected");
        return;
    }

    if (connectionState === 2) {
        console.log("Connecting.....");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI,{
            dbName: "User",
            bufferCommands: false
        })
        console.log("Connected")
    } catch (error) {
        console.log("Error in connecting database",error);
        throw new Error("Error occured while connecting to database.");
    }
}

export default connect;