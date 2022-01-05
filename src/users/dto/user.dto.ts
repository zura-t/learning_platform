import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  readonly name: string;
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({message: 'Некорректный email'})
  readonly email: string;
  readonly role: string;
}

export class RegisterStudentDto {
  readonly role: string;
  readonly name: string;
  readonly username?: string;
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({message: 'Некорректный email'})
  readonly email: string;
  @IsString({message: 'Должно быть строкой'})
  @Length(6, 16, {message: 'Длина пароля может быть не меньше 6 и не больше 16'})
  readonly password?: string;
  readonly mobile_phone?: string;
  readonly is_parent?: boolean;
  readonly child_info?: {
    name: string;
    gender: string;
    day_of_birth: string;
  }
  readonly avatar?: string;
}

export class LoginDto {
  readonly name: string;
  readonly password: string;
  readonly is_parent?: boolean;
  readonly child_name?: string;
}

export class CreateTeacherDto {
  readonly name: string;
  readonly username?: string;
  readonly email: string;
  readonly mobile_phone?: string;
  readonly avatar?: string;
}

export class UpdateUserDto {
  readonly name?: string;
  readonly username?: string;
  readonly phone?: string;
  readonly day_of_birth?: string;
  avatar?: string | null;
  readonly bio?: string;
  readonly languages?: Array<string>;
  readonly favourite_music?: string;
  readonly website?: string;
}