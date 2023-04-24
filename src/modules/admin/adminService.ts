import { Product } from "../../database/models";
import { getRequestSuccess, isSuccessI, ModError } from "../../database/types/handlers";
import { currentUserI } from "../../database/types/models";
import { getProductsResponse, postProductPayload } from "../../database/types/payloads";


export class AdminService {
    static async postProduct   (postProductPayload: postProductPayload, uploadedFile: any | undefined, currentUser: currentUserI, featuresArray: Array<{}>): Promise<isSuccessI >  {
       const {title, price, category, description, featuresDescription} = postProductPayload
       if (!uploadedFile) {
        const error = new ModError("Invalid file provided");
        error.statusCode = 500;
        throw error;
       }
       const product = new Product({
          title,
          price,
          category,
          description,
          features: featuresArray,
          image: uploadedFile.path,
          userId: currentUser.id,
          featuresDescription,
          rating: 0,
          reviews: 0
       })

       const result = await product.save()
       
   
         return {
           message: "Product uploaded succesfully",
           id: result._id,
           isSuccess: true,
         }
   };

   // static async getProducts(): Promise<getRequestSuccess<getProductsResponse> > {

   //    const products = await Product.find();


   //    if (!products) {
   //       const error = new ModError("No product found");
   //       error.statusCode = 404;
   //       throw error;
   //      }

   //      const productDisplay: Array<{title: string, image: string, price: number, _id: string, rating: number, reviews: number}> = products.map(product => {
   //       return {title: product.title, image: product.image, price: product.price, _id: product._id, rating: product.rating, reviews: product.reviews}
   //      })

   //    return {
   //       message: "Products fetched succesfully",
   //       isSuccess: true,
   //       data: productDisplay
   //     }
   // }

  
}