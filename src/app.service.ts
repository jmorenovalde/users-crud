import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users-dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserDto } from './dto/user.dto';
import { listUserDtoMock } from './mockdata/users.mock';
import { User } from './user.model';

@Injectable()
export class AppService {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    listUserDtoMock.forEach((userDto) => {
      this.users.push({ ...userDto, id: this.nextId++ });
    });
  }

  /**
   * Return the users.
   *
   * @param filterDto the filters of the search.
   * @returns the list of users
   */
  findUsers(filterDto: GetUsersDto): UserDto[] {
    let result = [...this.users];
    if (Object.keys(filterDto).length > 0) {
      const { _limit, _id, _sort, _page, _order } = filterDto;

      if (_id) {
        if (typeof _id === 'number') {
          const findUser = result.find(
            (user) => user.id.toString() === _id.toString(),
          );
          if (findUser) {
            return [findUser];
          } else {
            return [];
          }
        } else {
          // Thorws 400 status error - Bad Request
          throw new BadRequestException('The _id should be a number');
        }
      }
      let page = _page;
      if (!page || page.toString() === '0') {
        page = 1;
      }
      let order = _order;
      if (!order) {
        order = 'asc';
      } else if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
      }

      if (_sort) {
        if (result.length > 1 && order === 'asc') {
          result = result.sort((a, b) =>
            a[_sort].toString().localeCompare(b[_sort].toString()),
          );
        } else if (result.length > 1) {
          result = result.sort((a, b) =>
            b[_sort].toString().localeCompare(a[_sort].toString()),
          );
        }
      }
      if (_limit !== 0 && _limit <= result.length) {
        const start = _limit * (page - 1);
        const end = _limit * page;
        return result.slice(start, end);
      }
    }
    return result;
  }

  /**
   * Create a user in the system.
   *
   * @param user user to create.
   * @returns the created user.
   */
  createUser(user: CreateUserDto): User {
    // check name is not void and email is an email.
    const newUser: User = { id: this.nextId++, ...user };
    this.users.push(user);
    return user;
  }

  /**
   * Updatate the full user.
   *
   * @param id the ID of the user to update
   * @param user the objer of the user to updte
   * @returns the edited user
   */
  updateUser(id: number, user: User): User {
    this.checkId(id);
    if (id.toString() === user.id.toString()) {
      const index = this.getUserIndex(id, this.users);
      if (index) {
        this.users[index] = user;
        return user;
      }
    } else {
      throw new BadRequestException(
        'The parameter `id` is not the same that the `id` property',
      );
    }
  }

  /**
   * Partial update of a user (name and/or email and/or department).
   *
   * @param id the ID of the user to update
   * @param user the name, email and/or deparment to update.
   * @returns the updated user.
   */
  partialUpdateUser(id: number, user: PatchUserDto): User {
    this.checkId(id);
    const index = this.getUserIndex(id, this.users);
    if (index) {
      const { name, email, department } = user;
      if (name) {
        this.users[index].name = name;
      }
      if (email) {
        this.users[index].email = email;
      }
      if (department) {
        this.users[index].department = department;
      }
      return user;
    }
  }

  /**
   * Delete a user from the system by the Id.
   *
   * @param id the ID of the user to deleted
   * @returns the deleted user.
   */
  deleteUser(id: number): User {
    this.checkId(id);
    const index = this.getUserIndex(id, this.users);
    if (index) {
      const userToDelete = { ...this.users[index] };
      this.users.splice(index, 1);
      return userToDelete;
    }
  }

  private getUserIndex(id: number, users: User[]): number {
    const userIndex = users.findIndex(
      (userDto) => userDto.id.toString() === id.toString(),
    );
    if (!userIndex) {
      throw new NotFoundException('There are not any user with this `id`');
    }
    return userIndex;
  }

  private checkId(id: number): void {
    if (!id) {
      throw new BadRequestException('The parameter `id` is required');
    }
  }
}
