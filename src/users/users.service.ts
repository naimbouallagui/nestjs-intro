import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async insertUser(obj: User) {
        const result = await this.userModel.create(obj);
        return result;
    }
    async getUsers() {
        const result = await this.userModel.find();
        return result;
    }
    async getSingleUser(userId: string) {
        const result = await this.userModel.findById(userId);
        return result;
    }

    async getUserByUsername(username: string) {
        const result = await this.userModel.findOne({username:username});
        return result;
    }

    async updateUser(userId: string, data) {
        const result = await this.userModel.findByIdAndUpdate({_id: userId}, data);
        return result;
    }
    async deleteUser(userId: string) {
        const result = await this.userModel.findByIdAndDelete( userId);
        return result;
    }
}
