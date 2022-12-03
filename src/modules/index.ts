import { Application } from 'express';
import authRouter from './auth'

const apiVersion = '/api/v1';

const routes = [authRouter];

export default (app: Application) => {
    routes.forEach(route => {
        app.use(apiVersion, route);
    })
    return app
}