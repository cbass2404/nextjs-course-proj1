import { MongoClient } from 'mongodb';

export const connectDatabase = async (key) => {
    const client = await MongoClient.connect(key);

    return client;
};

export const insertDocument = async (client, collection, document) => {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
};

export const getEventComments = async (
    client,
    collection,
    query = null,
    sort = null
) => {
    const db = client.db();

    const documents = await db
        .collection(collection)
        .find(query)
        .sort(sort)
        .toArray();

    return documents;
};
