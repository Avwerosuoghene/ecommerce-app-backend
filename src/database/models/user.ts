import mongoose from 'mongoose';
import { UserI } from '../types/models';
const Schema = mongoose.Schema;

const userSchema = new Schema<UserI>({
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
    address: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
    userType: {
        type: String,
        required: true
    },
    cart: [{
        product: {
          type:  Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }],
}, 
 {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
 }
);

export default mongoose.model<UserI>('User', userSchema);