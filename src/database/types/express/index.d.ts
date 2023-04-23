declare namespace Express {
    export interface Request {
        currentUser?: currentUserI,
        file?: Express.Multer.File 
    }
}