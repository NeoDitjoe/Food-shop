const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DATABASE;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


/**
 * 
 * @param {string} folder - This will be the name of the folder
 * @param {string} collection This will be the name of collection we stored data in
 * 
 * {@link menuList} variable is used to seperate the _id from the rest of the data
 * This is because It was causing errors
 * @returns 
 */
export async function getMenuList(folder, collection) {
    const db = client.db(folder);
  
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
    const db = client.db(folder);
  
    const documents = await db
      .collection(collection)
      .find({ user: user })
      .toArray();
      
    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });
  
    return menuList;
}

export async function deleteSentOrder(folder, collection, user){

  const db = client.db(folder)

  const documents = await db
  .collection(collection)
  .deleteMany({ user: user })

  return documents;

}