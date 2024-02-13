import { client } from "../Database";

export default function getproducts(){
     
  const db = client.db('menulist')

  const results = db.collection('menu').aggregate([
    {$project: {_id: 0}}
  ]).toArray()

  return results
}