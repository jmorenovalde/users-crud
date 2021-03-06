import {
  Body,
  Controller,
  Get,
  Query,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users-dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get the users',
    operationId: 'findUsers',
    description: 'Get the users from the system. You can filter the result',
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    isArray: true,
    type: UserDto,
    description: 'Return the users.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The _id should be a number',
  })
  findUsers(@Query() filterDto: GetUsersDto): UserDto[] {
    return this.appService.findUsers(filterDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    operationId: 'createUser',
    description: 'This service create a new user in the system.',
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateUserDto,
    required: true,
    description: 'The user to create',
    isArray: false,
  })
  @ApiProduces('application/json')
  @ApiCreatedResponse({
    status: 201,
    isArray: false,
    type: UserDto,
    description: 'User created.',
  })
  createUser(@Body() user: CreateUserDto): UserDto {
    return this.appService.createUser(user) as UserDto;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a user',
    operationId: 'updateUser',
    description: 'This service update the user in the system.',
  })
  @ApiConsumes('application/json')
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The ID of the user to update',
  })
  @ApiBody({
    type: UserDto,
    required: true,
    description: 'The user to update',
    isArray: false,
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    isArray: false,
    type: UserDto,
    description: 'User updated.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The parameter `id` is not the same that the `id` property',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'There are not any user with this `id`',
  })
  updateUser(@Body() user: UserDto, @Param('id') id: number): UserDto {
    return this.appService.updateUser(id, user) as UserDto;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partial update of a user',
    operationId: 'partialUpdateUser',
    description: 'This service make a partial update the user in the system.',
  })
  @ApiConsumes('application/json')
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The ID of the user to update',
  })
  @ApiBody({
    type: PatchUserDto,
    required: true,
    description: 'The user data to update',
    isArray: false,
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    isArray: false,
    type: UserDto,
    description: 'User updated.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The parameter `id` is required',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'There are not any user with this `id`',
  })
  partialUpdateUser(@Body() user: UserDto, @Param('id') id: number): UserDto {
    return this.appService.partialUpdateUser(id, user) as UserDto;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Update a user',
    operationId: 'deleteUser',
    description: 'This service update the user in the system.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The ID of the user to update',
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    isArray: false,
    type: UserDto,
    description: 'User deleted.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'There are not any user with this `id`',
  })
  deleteUser(@Param('id') id: number): UserDto {
    return this.appService.deleteUser(id) as UserDto;
  }
}
