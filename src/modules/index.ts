import { Application } from 'express';
import authRouter from './auth';
import adminRouter from './admin';
import productsRouter from './products';
import cartRouter from './cart'

const apiVersion = '/api/v1';

const routes = [authRouter, adminRouter,productsRouter, cartRouter ];

export default (app: Application) => {
    routes.forEach(route => {
        app.use(apiVersion, route);
    })
    return app
}