export interface JWTPayload {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  role: string;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface UserMetadata {
  [key: string]: unknown;
}
