import {Roles} from './roles.model';

export class User {
  id?: number;
  username?: string;
  password?: string;
  enabled?: boolean;
  roles?: Roles[];
}

