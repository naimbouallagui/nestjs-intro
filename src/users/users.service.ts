import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async insertUser(obj: User) {
        return await this.userModel.create(obj);
    }
    async getUsers() {
        return await this.userModel.find();
    }
    async getSingleUser(userId: string) {
        return await this.userModel.findById(userId).exec();
    }

    async getUserByUsername(username: string) {
        return await this.userModel.findOne({username:username});
    }

    async updateUser(userId: string, data) {
        return await this.userModel.findByIdAndUpdate({_id: userId}, data);
    }
    async deleteUser(userId: string) {
        return await this.userModel.findByIdAndDelete( userId);
         
    }
    async validateUserJWT(payload): Promise<any> {
        return await this.userModel.findOne({username: payload.data.username}).exec();
      }
}
