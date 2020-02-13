import { Controller, Get, UseGuards, Post, Request, Body, UseInterceptors, UploadedFile, UploadedFiles, Param, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './multer/multer';
import { diskStorage } from 'multer';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Post('auth/login')
  async login(@Body('username') username, @Body('password') password) {
    return this.authService.login({ username, password });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async  uploadFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
  )
  async  uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }


  @Get('upload/:filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    return res.sendFile(file, { root: './upload' });
  }
}