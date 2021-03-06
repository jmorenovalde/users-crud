import { ApiPropertyOptional } from '@nestjs/swagger';
import { Department } from './user.dto';

/**
 * This class is used to implements the data transfer object in the create controller.
 */
export class CreateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'The name of the user.',
  })
  name?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'email',
    description: 'The email of the user.',
  })
  email?: string;

  @ApiPropertyOptional({
    type: String,
    enum: ['Development', 'Marketing'],
    description:
      'The department of the user. Aviable values: Marketing and Development.',
  })
  department?: Department;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The date time of the creation of the user in the system.',
  })
  created?: Date;
}
