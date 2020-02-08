import {Schema} from 'mongoose';

export const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // address: {
    //     city: String,
    //     address: String,
    //     country: String
    // }
})