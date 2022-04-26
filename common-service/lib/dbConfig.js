import { connect } from "mongoose";
const connectToDatabase = async () => {
    console.log('Connecting to the database...');
    await connect(process.env.MONGODB_URL);
};
export const dbConnection = connectToDatabase;
//# sourceMappingURL=dbConfig.js.map