import mongoose from "mongoose";
import env from "../env";

export default mongoose.connect(env.database.connection_mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
})
    .then(() => console.log('MongoDb::: connected!!'))
    .catch((error) => console.log('MongoDB::: Failed to connect!! ', error.message))


