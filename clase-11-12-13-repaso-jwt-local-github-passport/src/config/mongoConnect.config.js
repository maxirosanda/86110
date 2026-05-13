// patron Singleton
import mongoose from "mongoose";
import "./dotenv.config.js";

const connectMongoState = {
    state: "",
    active: false
}

export const connectMongo = async () => {
    try {
        if (connectMongoState.active) {
            return connectMongoState.state;
        }
        const connectionMongo = await mongoose.connect(process.env.MONGO_URI);
        connectMongoState.active = true;
        switch (connectionMongo.connection.readyState) {
            case 0:
                connectMongoState.state = "disconnected";
                break;
            case 1:
                connectMongoState.state = "connected";
                break;
            case 2:
                connectMongoState.state = "connecting";
                break;
            case 3:
                connectMongoState.state = "disconnecting";
                break;
        }
        console.log("MongoDB state: ", connectMongoState.state);
    } catch (error) {
        console.log("MongoDB not connected", error);
        connectMongoState.active = false;
        connectMongoState.state = "disconnected";
    }
    return connectMongoState.state;
}