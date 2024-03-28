import dbConnect from "@/lib/db"; 
import User from "@/model/User"

export async function getUserByEmail(email){
    try{
        const client = await dbConnect();
        // const db = await client.db(process.env.DATABASE_NAME);
        // const userCollection = await db.collection(process.env.USERS_COLLECTION);
        const user = await User.findOne({email});

        return user;
    }
    catch(err){
        return null;
    }
}