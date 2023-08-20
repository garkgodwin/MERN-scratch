import { MongoClient } from "mongodb";
import { MONGODB_URI, DATABASE_NAME } from "./config";

let clientDB;
export const connectClient = async () => {
  if (clientDB) {
    return clientDB.db(DATABASE_NAME);
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  await client.db(DATABASE_NAME).command({ ping: 1 });
  console.log("Connected to the database");

  return client.db(DATABASE_NAME);
};

export const stopClient = async () => {
  await clientDB?.close();
};
