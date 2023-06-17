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
    cart: Array<cartI> ,
    image: string,
    phone: string
  }

  export interface cartI {
    product: Pick<ProductI,'_id' | 'price' | 'title' | 'image' >;
    quantity: number;
    _id: string;
    type: cartType,
    sum: number
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

  export enum cartType {
    single = 1,
    bulk = 2
}