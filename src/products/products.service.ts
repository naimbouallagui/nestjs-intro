import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
    async insertProduct(obj: Product) {
        return await this.productModel.create(obj);
    }
    async getProducts() {
        return await this.productModel.find();
    }
    async getSingleProduct(productId: string) {
        return await this.productModel.findById(productId);
    }
    async updateProduct(productId: string, data) {
        return await this.productModel.findByIdAndUpdate({_id: productId}, data);
    }
    async deleteProduct(productId: string) {
        return await this.productModel.findByIdAndDelete( productId);
    }
}
