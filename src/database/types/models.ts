import { postProduct } from "./handlers";

export interface UserI {
    email: string;
    password: string;
    name: string;
    _id: string;
    userType: string;
    timestamps: {
      createdAt: string;
      updatedAt: string;
    };
    cart: Array<cartI>
  }

  export interface cartI {
    product: Object;
    quantity: number;
    _id: string
  }
  
  export interface currentUserI {
    email: string;
    id: string
  }
  
  export interface ProductI extends postProduct {
    _id: string;
    timestamps: {
      createdAt: string;
      updatedAt: string;
    };
    userId: Object;
    image: string;
  }
  
  export interface IConfigurables {
    dev: {
      [key: string]: string;
    };
    prod: {
      [key: string]: string;
    };
  }