import { ID } from 'appwrite';

import { INewUser } from "@/types";
import { account } from './config';

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        return newAccount;
    } catch (error) {
        console.log(error);
        return error;        
    }
 // extract the information of the new account and save it on appwrite
}