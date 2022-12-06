import { IsNotEmpty, IsEmail } from 'class-validator';
export class UserDto {
  readonly id?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
