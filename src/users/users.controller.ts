/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Post, Body, Get, Param} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post()
    async addUser( @Body() obj: User ):Promise<User> {
        return  await this.usersService.insertUser(obj);
    }

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }
    @Get(':id')
    async getUser(@Param('id') userId: string) {
        return await this.usersService.getSingleUser(userId);
    }

    @Post('update/:id')
    async updateUser(
        @Param('id') userId: string, 
        @Body('username') userUsername: string, 
        @Body('email') userEmail: string, 
        @Body('password') userPassword: number
        ) {
            const data={username: userUsername, email: userEmail, password: userPassword}
            await this.usersService.updateUser(userId,data);
            return null;
    }
    @Post(':id')
    async removeUser(@Param('id') userId: string) {
        await this.usersService.deleteUser(userId);
        return null;
    }
}