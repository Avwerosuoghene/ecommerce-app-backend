import { clear } from "console";
import { features } from "process";
import { Product, User } from "../../database/models";
import {
  fetchCart,
  fetchloggedinUser,
  getRequestSuccess,
  isSuccessI,
  ModError,
} from "../../database/types/handlers";
import { currentUserI, UserI } from "../../database/types/models";
import {
  getProductsResponse,
  postProductPayload,
} from "../../database/types/payloads";
import { clearImage } from "../../helpers/misc";

export class AdminService {
  static async postProduct(
    postProductPayload: postProductPayload,
    uploadedFile: any | undefined,
    currentUser: currentUserI,
    featuresArray: Array<{}>
  ): Promise<isSuccessI> {
    const { title, price, category, description, featuresDescription } =
      postProductPayload;
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
      reviews: 0,
    });

    const result = await product.save();

    return {
      message: "Product uploaded succesfully",
      id: result._id,
      isSuccess: true,
    };
  }

  static async editProduct(
    postProductPayload: postProductPayload,
    uploadedFile: any | undefined,
    currentUser: currentUserI,
    featuresArray: [{ name: string; quantity: number }],
    productId: string
  ): Promise<isSuccessI> {
    const { title, price, category, description, featuresDescription } =
      postProductPayload;
    const product = await Product.findById(productId);

    if (!product) {
      const error = new ModError("No product found");
      error.statusCode = 404;
      throw error;
    }

    if (currentUser.id !== product.userId.toString()) {
      const error = new ModError("Not Authorized");
      error.statusCode = 403;
      throw error;
    }
    if (uploadedFile) {
      clearImage(product.image);
      product.image = uploadedFile.path;
    }
    product.title = title;
    product.price = price;
    product.category = category;
    product.description = description;
    product.featuresDescription = featuresDescription;
    product.features = featuresArray;

    const result = await product.save();

    return {
      message: "Product updated succesfully",
      id: result._id,
      isSuccess: true,
    };
  }

  static async deleteProduct(
    currentUser: currentUserI,
    productId: string
  ): Promise<isSuccessI> {
    const product = await Product.findById(productId);

    if (!product) {
      const error = new ModError("No product found");
      error.statusCode = 404;
      throw error;
    }

    if (currentUser.id !== product.userId.toString()) {
      const error = new ModError("Not Authorized");
      error.statusCode = 403;
      throw error;
    }

    clearImage(product.image);
    await Product.findByIdAndRemove(productId);

    return {
      message: "Product deleted succesfully",
      id: product._id,
      isSuccess: true,
    };
  }

  static async fetchUser(
    currentUser: currentUserI
  ): Promise<fetchloggedinUser> {
    const currentUserInfo = await User.findById(currentUser.id);

    if (!currentUserInfo) {
      const error = new ModError("No user found");
      error.statusCode = 404;
      throw error;
    }
    const { email, name, userType, image, address, phone } = currentUserInfo;
    return {
      message: "User fetched succesfully",
      isSuccess: true,
      userInfo: { email, name, userType,image, address, phone },
    };
  }
  static async updateProfile(
    currentUser: currentUserI,
    uploadedFile: any | undefined,
    updatedInfo: Pick<UserI, 'email'|'name' | 'address'>  & {remove: string}
  ):Promise<isSuccessI>  {
    const currentUserInfo = await User.findById(currentUser.id);

    if (!currentUserInfo) {
      const error = new ModError("No user found");
      error.statusCode = 404;
      throw error;
    }
    currentUserInfo.email =  updatedInfo.email;
    currentUserInfo.name = updatedInfo.name;
    currentUserInfo.address = updatedInfo.address;


    if (updatedInfo.remove  ) {
      currentUserInfo.image = ''
    }

    else if (uploadedFile && currentUserInfo.image ) {
      clearImage(currentUserInfo.image);
      currentUserInfo.image = uploadedFile.path;
    } else {
      currentUserInfo.image = uploadedFile.path;
    };

    currentUserInfo.save()

    return {
      message: "Profile updated succesfully",
      isSuccess: true,
    };
  }

  static async createOrder(currentUser: currentUserI):Promise<fetchCart> {
    const currentUserInfo = await User.findById(currentUser.id)
    .select("cart")
    .populate({
      path:'cart.product',
      select:'title price image'
 });

    if (!currentUserInfo) {
      const error = new ModError("No user found");
      error.statusCode = 404;
      throw error;
    }
    const cartItems = currentUserInfo.cart;
    console.log(currentUserInfo)
    currentUserInfo.cart = [];
    await currentUserInfo.save()
    return {
      message: "Order placed succesfully",
      cart: cartItems,
      isSuccess: true,
    }
  }
}
