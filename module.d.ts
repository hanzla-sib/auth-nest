declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    jwtRefreshTokenKey: string;
  }
}
