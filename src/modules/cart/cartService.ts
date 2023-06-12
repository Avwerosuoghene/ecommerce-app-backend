import { NextFunction } from "express";
import { Product, User } from "../../database/models";
import { fetchCart, isSuccessI, ModError } from "../../database/types/handlers";
import { cartI, cartType, currentUserI } from "../../database/types/models";

export class CartService {
  static async fetchCart(currentUser: currentUserI): Promise<fetchCart> {
    const receivedCartObject: {cart: Array<cartI>, _id: String} | null = await User.findById(currentUser.id)
      .select("cart")
      .populate({
        path:'cart.product',
        select:'title price image'
   });
   const cart:  Array<cartI> | [] = receivedCartObject? receivedCartObject.cart : [];
    if (!cart) {
      const error = new ModError("No cart found for user");
      error.statusCode = 404;
      throw error;
    }
    let totalAmount = 0;
    for (let i=0; i < cart.length; i++) {
      totalAmount += cart[i].sum
    }
    return {
      message: "Cart fetched succesfully",
      isSuccess: true,
      cart,
      total: totalAmount
    };
  }

  static async addToCart(
    currentUser: currentUserI,
    addToCartPayload: Array<Omit <cartI, 'sum' >>
  ): Promise<isSuccessI> {
    const currentUserInfo = await User.findById(currentUser.id).populate({
      path:'cart.product',
 });



    
    if (!currentUserInfo) {
      const error = new ModError("No user found");
      error.statusCode = 404;
      throw error;
    }

    let existingCartItemsFound: {
      [key: string]: {quantity: number, index: number} ,
     } = {};

  
  for (let [index,existingCartItem] of currentUserInfo.cart.entries()) {
    let id = existingCartItem.product._id.toString();
    existingCartItemsFound![id] = {quantity: existingCartItem.quantity, index:index } 
    console.log(existingCartItemsFound)
  }
    let productError = undefined;
    const iterationOverItem = async () => {
      for (const cartItem of addToCartPayload) {
        let product;

        try {
          product = await Product.findById(cartItem.product);
        } catch (error) { 
          
          productError = `Product with id ${cartItem.product} is invalid`;
          const err = new ModError(productError);
          err.statusCode = 404;
          throw err;
        }

        const propertyExists = existingCartItemsFound.hasOwnProperty(cartItem.product.toString());

          if (propertyExists && cartItem.type === cartType.bulk) {
            const index = existingCartItemsFound[cartItem.product.toString()].index;
            currentUserInfo.cart[index].quantity = cartItem.quantity;
            currentUserInfo.cart[index].sum = Number(product?.price) *  Number(currentUserInfo.cart[index].quantity)
        } 
        else if (propertyExists && cartItem.type === cartType.single){
          const index = existingCartItemsFound[cartItem.product.toString()].index;
          currentUserInfo.cart[index].quantity = currentUserInfo.cart[index].quantity + cartItem.quantity;
          currentUserInfo.cart[index].sum = Number(product?.price) *  Number(currentUserInfo.cart[index].quantity)
        }
        else {
          const completeItem = {...cartItem, sum: Number(cartItem.quantity) * Number(product?.price)}
          currentUserInfo.cart.push(completeItem)
        }
       
       

      }
    };


    await iterationOverItem();


    await currentUserInfo.save();
    return {
      message: "Cart updated succesfully",
      id: currentUserInfo._id,
      isSuccess: true,

    };
  }

  static async removeFromCart(
    currentUser: currentUserI,
    productId: string
  ): Promise<isSuccessI> {
    const currentUserInfo = await User.findById(currentUser.id).select("cart")
    
    if (!currentUserInfo) {
      const error = new ModError("No user found");
      error.statusCode = 404;
      throw error;
    }

    currentUserInfo.cart = currentUserInfo.cart.filter(cartItem => cartItem._id.toString() !== productId);
    await currentUserInfo.save();
    return {
      message: "Cart item deleted succesfully",
      isSuccess: true,
    };
  }

  static async clearFromCart(
    currentUser: currentUserI,
  ): Promise<isSuccessI> {
    const currentUserInfo = await User.findById(currentUser.id).select("cart")
    
    if (!currentUserInfo) {
      const error = new ModError("No user found");
      error.statusCode = 404;
      throw error;
    }

    currentUserInfo.cart = []
    await currentUserInfo.save();
    return {
      message: "Cart cleared succesfully",
      isSuccess: true,
   
    };
  }
}
