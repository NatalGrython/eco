declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    HOST_DB: string;
    PORT_DB: string;
    USERNAME_DB: string;
    PASSWORD_DB: string;
    DATABASE_NAME_DB: string;
    VK_ID: string;
    VK_SECRET: string;
  }
}
