import { connectDatabase } from "@/database/Database";

export default async function handler(req, res) {
    if(req.method === 'POST'){
  
    let client = await connectDatabase('menulist')

    const db = client.db()

    try{
    const result = await db.collection('menu').updateOne({
        
    product: "Drinks"
    }, {
        $push: {
        menu: { price: '20.00', list: 'Sprite 2L'}
        }
    });

    console.log(result)

    }catch(error){
    client.close();
    res.status(404).json({message: 'Attempt Failed'})
    return;
    }

    client.close()

    res.status(201).json({ message: 'Successfully stored!' });
    }
  }