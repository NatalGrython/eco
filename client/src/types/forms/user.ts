export interface UpdateUserDto {
  avatar?: File;
  login?: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  email?: string;
  address?: string;
  id: number;
}
