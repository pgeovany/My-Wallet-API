import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI, MONGO_DATABASE } = process.env;
const mongoClient = new MongoClient(MONGO_URI);

async function getDataBase() {
  await mongoClient.connect();
  return mongoClient.db(MONGO_DATABASE);
}

async function closeDataBase() {
  await mongoClient.close();
}

export { getDataBase, closeDataBase, ObjectId };
