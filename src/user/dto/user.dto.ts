import { IsEmail, IsString, isNumber } from 'class-validator';
export class CreateuserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
