import { Module } from "@nestjs/common";
import { ProductsController } from "./apis/products.controller";
import { ProductsService } from "./service/products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./models/interface/product.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers : [ProductsController],
    providers : [ProductsService]
})
export class ProdctsModule {}