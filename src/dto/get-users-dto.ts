import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'This param is used to limit the result to show in the page.',
  })
  _limit?: number;
  @ApiPropertyOptional({
    type: Number,
    description:
      'This param is used to return the detail of the user with this `id`.',
  })
  _id?: number;
  @ApiPropertyOptional({
    type: String,
    enum: ['id', 'name', 'email', 'departmen', 'created'],
    description:
      'The field to sort. By default the sort is ascending, if the sorting is needed to be descending, use the `_order` search field equal `desc`.',
  })
  _sort?: string;
  @ApiPropertyOptional({
    type: Number,
    description:
      'The page of the search. By default is 1 and is send 0 sertur the first page.',
  })
  _page?: number;
  @ApiPropertyOptional({
    type: String,
    enum: ['asc', 'desc'],
    description:
      'The order of the result when sort by a field. By default is `asc`.',
  })
  _order?: string;
}
