import  { Document } from 'mongoose';
export interface Product extends Document{
    id: string,
    title: string,
    description: string,
    price: number,
    // address: object
}