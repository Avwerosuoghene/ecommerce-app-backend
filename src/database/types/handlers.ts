import { cartI, UserI } from "./models";

export interface CustomError {
    message: string;
    statusCode: number | undefined;
    data: any;
  }
  
  export class ModError extends Error {
    status = 400;
  
    constructor(message: string) {
      super(message);
  
      // 👇️ because we are extending a built-in class
      Object.setPrototypeOf(this, ModError.prototype);
    }
    data: any;
    statusCode: number | undefined;
  }
  
  export interface isSuccessI {
    message: string,
    id?: string,
    isSuccess: boolean
  }


  export interface fetchloggedinUser extends isSuccessI {
    userInfo:  Omit<UserI, "timestamps" | "_id" | "password" | "cart">
  }

  export interface fetchCart extends isSuccessI {
    cart: Array<cartI>,
    total: number
  }
  
  export interface isLoginIsSuccessI extends isSuccessI {
    token: string,
    userType: string
  }

  export interface getRequestSuccess <T> extends isSuccessI  {
    data: T
  }
  
  export interface postProduct{
    title: string;
    price: number;
    category: string;
    description: string;
    features: [
      {
        name: string;
        quantity: number;
      }
    ];
    featuresDescription: string;
    rating: number;
    reviews: number;

    
  }
  
  export interface FileWithPath extends File {
    path: string
  }