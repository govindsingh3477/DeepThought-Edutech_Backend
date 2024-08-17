import { MongoClient,ObjectId } from 'mongodb';
import { DB_NAME } from '../constants.js';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = DB_NAME;

const connectDB = async()=> {
    try {
        await client.connect();
        console.log('Connected successfully to server');
    } catch (error) {
        console.log("error connecting to db ", error);
    }
}
const queryDocumentById = async(collectionName, documentId)=>{
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const query = { _id: new ObjectId(documentId) };

    return await collection.findOne(query);
}
const createDocumentByData = async(collectionName,documentData)=>{
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
    
        const result = await collection.insertOne(documentData);
        return result.insertedId;
    } catch (error) {
        console.log(error)
    }
}
const queryDocumentsByPagination= async(collectionName,type,limit,page)=>{
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
         page = parseInt(page)||1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        // sorting= type==latest? -1:1;
        const results = await collection.find().sort({ updatedAt: -1 }).skip(skip).limit(limit).toArray();
        // console.log(results)
        return results;
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async(collectionName,documentId)=>{
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(documentId) });
        // console.log(result)
        if (result.deletedCount === 1) {
            console.log(`Successfully deleted document with _id: ${documentId}`);
        } else {
            console.log(`No document found with _id: ${documentId}`);
        }
        
        
    } catch (error) {
        console.log(error);
    }
}
 
const updateById = async(collectionName,documentId,updateData)=>{
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne(
            { _id: new ObjectId(documentId) },
            { $set: updateData }
        );
        // console.log(result)
        if (result.matchedCount === 1) {
            console.log(`Successfully updated document with _id: ${documentId}`);
        } else {
            console.log(`No document found with _id: ${documentId}`);
        }
    } catch (error) {
        console.log(error)
    }
}

export {connectDB,queryDocumentById,createDocumentByData,queryDocumentsByPagination,deleteById,updateById};