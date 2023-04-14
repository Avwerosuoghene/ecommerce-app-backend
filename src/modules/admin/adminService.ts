import { FileWithPath, isSuccessI, postProductPayload } from "../../database/types/type";


export class AdminService {
    static async postProduct   (postProductPayload: postProductPayload): Promise<isSuccessI >  {
       const {title, price, category, description, features, image} = postProductPayload
        
       const imageUrl = (image as FileWithPath).path
       console.log(imageUrl)
       
   
         return {
           message: "User created succesfully",
           id: 'sdfdd',
           isSuccess: true,
         }
   };

  
}