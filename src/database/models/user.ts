import mongoose from 'mongoose';
import { UserI } from '../types/type';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
}, 
 {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
 }
);

export default mongoose.model<UserI>('User', userSchema);