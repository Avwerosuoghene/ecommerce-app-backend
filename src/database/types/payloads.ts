import { postProduct } from "./handlers";
import { ProductI } from "./models";



export interface logingPayload {
    email: string;
    password: string;
  }
  
  export interface signUpPayload extends logingPayload {
    name: string;
    userType?: string;
  }
  
  export interface resetPassPayload extends logingPayload {
    confirmPassword: string;
  }
  
  
  
  export interface postProductPayload extends postProduct{

  }
  
  interface JwtPayload {
    id: string;
  }

  export type getProductsResponse = Array <Pick<ProductI, "title" | "image" | "price" | "_id" | "rating" | "reviews">>
  