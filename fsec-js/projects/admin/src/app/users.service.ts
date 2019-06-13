import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { User } from './users/users.state';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<User, User> {
  base = '/api/v1/users';
}
