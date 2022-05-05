import mongoose, { connect } from "mongoose";
// import * as dotenv from "dotenv";


// dotenv.config();

let conn = null;
let uri = process.env.MONGODB_URL;

const connectToDatabase = async () => {
    if (conn === null) {
        console.log('Connecting to the database...')
        conn = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        }).then(() => mongoose);

        await conn;
    }

    return conn;
}

export const dbConnection = connectToDatabase;