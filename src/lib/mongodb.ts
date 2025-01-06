import { MongoClient } from 'mongodb';

// Use the MongoDB URI directly from the environment variables
const client = new MongoClient(process.env.MONGODB_URI!);

export async function connectToDatabase() {
  // Connect to the database
  await client.connect();

  // Get the database name from the URI
  const db = client.db();

  return { db };
}
