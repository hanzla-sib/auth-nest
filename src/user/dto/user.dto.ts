import { IsEmail, IsString, isNumber } from 'class-validator';
export class CreateuserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
