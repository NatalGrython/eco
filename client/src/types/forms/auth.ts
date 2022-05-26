export interface RegistrationDto {
  password: string;
  confirmPassword: string;
  login: string;
}

export interface LoginDto {
  password: string;
  login: string;
}

export interface VkAuthDto {
  code: string;
}
