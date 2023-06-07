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
    address: string,
    cart: Array<cartI>,
    image: string,
    phone: string
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