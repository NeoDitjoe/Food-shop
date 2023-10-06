import { MongoClient } from 'mongodb'

export async function connectDatabase(folder) {

    const client = await MongoClient.connect(`mongodb+srv://bobo:wHWkFbRSdYCcIBs6@cluster0.x9eyl3e.mongodb.net/${folder}?retryWrites=true&w=majority`)

    return client

}

export async function getMenuList(folder, collection) {
    let client = await connectDatabase(folder);
    const db = client.db();
  
    const documents = await db
      .collection(collection)
      .find()
      .toArray();
      
    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });
  
    return menuList;
}

export async function getCartList(folder, collection, user) {
    let client = await connectDatabase(folder);
    const db = client.db();
  
    const documents = await db
      .collection(collection)
      .find({ user: 'ditjoeneo33@gmail.com' })
      .toArray();
      
    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });
  
    return menuList;
}