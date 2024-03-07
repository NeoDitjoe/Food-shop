import getCurrentWeek from "@/util/getCurrentWeek";
import { client } from "../Database";

export default async function getUsers() {

  const db = client.db('authentication')

  const currentWeek = await db.collection('users').aggregate([
    {
      $match: {
        createdAtWeek: getCurrentWeek()
      },
    },
    { 
      $project: { _id: 0, name: 'Current Week' },
      
    },
    {
      $group:{
        _id: null,
        customers: {$sum: 1},
        name: { $first: "$name" }
      }
    }
  ]).toArray()

  const previousWeek = await db.collection('users').aggregate([
    {
      $match: {
        createdAtWeek: getCurrentWeek() - 1
      },
    },
    { 
      $project: { _id: 0, name: 'Last Week' },
      
    },
    {
      $group:{
        _id: null,
        customers: {$sum: 1},
        name: { $first: "$name" }
      }
    }
  ]).toArray()

  const twoWeeksBack = await db.collection('users').aggregate([
    {
      $match: {
        createdAtWeek: getCurrentWeek() - 2
      },
    },
    { 
      $project: { _id: 0, name: 'Week before last' },
      
    },
    {
      $group:{
        _id: null,
        customers: {$sum: 1},
        name: { $first: "$name" }
      }
    }
  ]).toArray()

  return {
    currentWeek,
    previousWeek,
    twoWeeksBack
  }
}
