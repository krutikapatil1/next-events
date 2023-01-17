import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextJsPractice:nextJsPractice34@cluster0.h3k9eua.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
};

export const insertDocument = async (
  client: any,
  collection: string,
  document: any
) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getDocuments = async (
  client: any,
  collection: string,
  filter: any,
  sort: any
) => {
  const db = client.db();
  const result = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return result;
};
