import { client } from "@/database/Database"

export default function removePlaceOrder(username, item){

    const db = client.db('cart')

    db.collection('placedOrders').deleteOne({customer: username, item : item})
}