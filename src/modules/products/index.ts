import { Router } from "express";
import { ProductsController } from "./productsController";

const router = Router();

router.get("/products", ProductsController.getProducts  );
router.get("/products/:id", ProductsController.getProductById  );
router.get("/productByUserId", ProductsController.getProductsByUserId  );

export default router;