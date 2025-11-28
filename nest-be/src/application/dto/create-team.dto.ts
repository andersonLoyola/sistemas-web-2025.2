import { IsUUID, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamRequestDto {
  @ApiProperty({ description: 'Team name', example: 'Team Rocket' })
  @IsString()
  @MinLength(2)
  name!: string;
}

export class CreateTeamResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  gameJamId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;
}
