export class createUserDto {
  login: string;
  password?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  email?: string;
}

export class createUserWithImageDto extends createUserDto {
  imagePath?: string;
}
