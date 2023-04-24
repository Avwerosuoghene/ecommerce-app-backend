import { Application } from 'express';
import authRouter from './auth';
import adminRouter from './admin';
import productsRouter from './products';

const apiVersion = '/api/v1';

const routes = [authRouter, adminRouter,productsRouter ];

export default (app: Application) => {
    routes.forEach(route => {
        app.use(apiVersion, route);
    })
    return app
}