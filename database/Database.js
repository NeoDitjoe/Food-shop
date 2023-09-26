import { MongoClient } from 'mongodb'

export async function connectDatabase() {

    const client = await MongoClient.connect('mongodb+srv://bobo:wHWkFbRSdYCcIBs6@cluster0.x9eyl3e.mongodb.net/menulist?retryWrites=true&w=majority')

    return client

}

export async function insertDocument(client, collection,  document){

    const db = client.db()

    const result  = await db.collection(collection).insertOne(document)
    return result
}

export async function getMenuList(client, collection){

    const db = client.db()

    const documents = await db
        .collection(collection)
        .find()
        .toArray()

    return documents

}