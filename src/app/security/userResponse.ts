import {User} from './user';

export interface UserResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
