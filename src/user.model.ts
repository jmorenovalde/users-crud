import { Department } from './dto/department.type';

export class User {
  /**
   * The identity field of the user.
   */
  id?: number;
  /**
   * The name of the user.
   */
  name?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * The department of the user
   * Aviable values: Marketing and Development.
   */
  department?: Department;
  /**
   * The date time of the creation of the user in the system.
   */
  created?: Date;
}
