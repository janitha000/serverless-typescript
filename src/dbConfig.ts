import { connect } from "mongoose";
// import * as dotenv from "dotenv";


// dotenv.config();

const connectToDatabase = async () => {
    console.log('Connecting to the database...')
    const database = await connect(process.env.MONGODB_URL);

}

export const dbConnection = connectToDatabase;