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
      .aggregate([])
      .toArray();
      
    const menuList = documents.map((doc) => {
      const { _id, ...menuData } = doc;
      return menuData;
    });
  
    return menuList;
}

export async function getSpecials(folder, collection) {
    const db = client.db(folder);
  
    const documents = await db
      .collection(collection)
      .aggregate([
        {
          $unwind: "$menu" 
        },
        {
          $match: {
            "menu.special": true
          }
        },
        {
          $group: {
            _id: { _id: "$_id", product: "$product", image: "$image" },
            menu: { $push: "$menu" } 
          }
        },
        {
          $project: {
            _id: "$_id._id",
            product: "$_id.product",
            image: "$_id.image",
            menu: 1
          }
        }
      ])
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

export async function getSearchDdata(input) {
  const db = client.db('menulist');

  const documents = await db
    .collection('menu')
    .find({ $or: [
      { product : { $regex: new RegExp(input, 'i') }}, 
      {menu: { $elemMatch: {item:  {$regex: new RegExp(input, 'i')}}}} 
    ] })
    .toArray();

  return documents;
}
