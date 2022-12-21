export interface CustomError {
    message: string;
    statusCode: number | undefined;
    data: any;
  }
  
  export interface UserI {
    email: string;
    password: string;
    name: string;
    _id: string;
    timestamps: {
      createdAt: string;
      updatedAt: string;
    };
  };

  export interface IConfigurables {
    dev: {
        [key: string]: string;
    },
    prod: {
        [key: string]:  string;
    }
}

export interface logingPayload {
  email: string,
  password: string,
}

  export interface signUpPayload  extends logingPayload {
    name: string,
    userType? : string
  }



  export interface resetPassPayload extends logingPayload {
    confirmPassword: string
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
  
  