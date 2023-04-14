// **Handlers
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
  id: string,
  isSuccess: boolean
}

export interface isLoginIsSuccessI extends isSuccessI {
  token: string,
  userType: string
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
  
}

export interface FileWithPath extends File {
  path: string
}

// **Models
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
  imageUrl: string
}

export interface IConfigurables {
  dev: {
    [key: string]: string;
  };
  prod: {
    [key: string]: string;
  };
}

// **Payloads
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
  image: File;
}

interface JwtPayload {
  id: string;
}


