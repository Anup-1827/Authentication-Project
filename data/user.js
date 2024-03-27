import { clientPromise } from "@/lib/db";

export async function getUserByEmail(email){
    try{
        const client = await clientPromise;
        const db = await client.db(process.env.DATABASE_NAME);
        const userCollection = await db.collection(process.env.USERS_COLLECTION);
        const user = await userCollection.findOne({email});

        return user;
    }
    catch(err){
        return null;
    }
}