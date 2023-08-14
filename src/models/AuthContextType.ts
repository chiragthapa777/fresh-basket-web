export interface AuthContextDataType {
  jwt: string;
  user: any;
  authenticated: boolean;
  loading: boolean;
  error: string;
}