import { Product } from "../../database/models";
import { getRequestSuccess, ModError } from "../../database/types/handlers";
import {
  getProductById,
  getProductsResponse,
} from "../../database/types/payloads";

const productFilter = (products: getProductsResponse) => {
    products.map((product) => {
        return {
          title: product.title,
          image: product.image,
          price: product.price,
          _id: product._id,
          rating: product.rating,
          reviews: product.reviews,
        };
      });

      return products
}

export class ProductsService {
  static async getProducts(): Promise<getRequestSuccess<getProductsResponse>> {
    const products = await Product.find();

    if (!products) {
      const error = new ModError("No product found");
      error.statusCode = 404;
      throw error;
    }

    // const productDisplay: getProductsResponse = products.map((product) => {
    //   return {
    //     title: product.title,
    //     image: product.image,
    //     price: product.price,
    //     _id: product._id,
    //     rating: product.rating,
    //     reviews: product.reviews,
    //   };
    // });

    return {
      message: "Products fetched succesfully",
      isSuccess: true,
      data: productFilter(products),
    };
  }

  static async getProductById(
    id: string
  ): Promise<getRequestSuccess<getProductById>> {
    const product = await Product.findById(id);

    if (!product) {
      const error = new ModError("No product found");
      error.statusCode = 404;
      throw error;
    }

    const productDisplay: getProductById = {
      _id: product._id,
      image: product.image,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      features: product.features,
      featuresDescription: product.featuresDescription,
      rating: product.rating,
      reviews: product.reviews,
    };

    return {
      message: "Product fetched succesfully",
      isSuccess: true,
      data: productDisplay,
    };
  }

  static async getProductByUserId(
    id: any
  ): Promise<getRequestSuccess<getProductsResponse>> {
    const products = await Product.find({ userId: id });

    if (!products) {
      const error = new ModError("No product found");
      error.statusCode = 404;
      throw error;
    };

    // const productDisplay: getProductsResponse = products.map((product) => {
    //     return {
    //       title: product.title,
    //       image: product.image,
    //       price: product.price,
    //       _id: product._id,
    //       rating: product.rating,
    //       reviews: product.reviews,
    //     };
    //   });

    return {
      message: "Products fetched succesfully",
      isSuccess: true,
      data: productFilter(products),
    };
  }
}
