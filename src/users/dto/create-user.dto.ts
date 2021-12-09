export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
}

export class RegisterStudentDto {
  readonly role: string;
  readonly name: string;
  readonly username?: string;
  readonly email: string;
  readonly password: string;
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
  readonly mobile_phone: string;
  readonly avatar?: string;
}