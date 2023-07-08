import { MinLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'password must be min 6 characters' })
  readonly password: string;
}
