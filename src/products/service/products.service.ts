import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../models/interface/product.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        });
        // newProduct.save().then();
        const result = await newProduct.save();
        
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
        // return this.products.slice();
    }
    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id: product.id, 
            title: product.title, 
            description: product.description, 
            price: product.price};
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }
    async deleteProduct(prodId: string) {
        // const [product, index] = this.findProduct(prodId);
        // const index = this.findProduct(prodId)[1];
        // return this.products.splice(index, 1);
        await this.productModel.deleteOne({_id: prodId}).exec();
    }
    private async findProduct(id: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(id);
        }catch (error){
            throw new NotFoundException('Could not found the product.');
        }
        if (!product) {
            throw new NotFoundException('Could not found the product.');
        }
        return product;
    }

}
