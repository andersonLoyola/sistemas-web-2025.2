import { Body, Controller, Post, Param, UsePipes, ValidationPipe, HttpCode, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateTeamRequestDto, CreateTeamResponseDto } from '../../application/dto/create-team.dto';
import { CreateTeamUseCase } from '../../application/use-cases/create-team.usecase';
import { Team } from '../../domain/entities/teams.entity';
import { TeamDetailUseCase } from 'src/application/use-cases/team-detail.usecase';

@ApiTags('teams')
@Controller('game-jams/:gameJamId/teams')
export class TeamsController {
  constructor(
    private readonly createTeamUseCase: CreateTeamUseCase,
    private readonly teamDetailUseCase: TeamDetailUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a team inside a Game Jam' })
  @ApiParam({ name: 'gameJamId', required: true, description: 'Game Jam UUID' })
  @ApiBody({ type: CreateTeamRequestDto })
  @ApiResponse({ status: 201, description: 'Team created', type: CreateTeamResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(
    @Param('gameJamId') gameJamId: string,
    @Body() body: CreateTeamRequestDto
  ): Promise<CreateTeamResponseDto> {
    const team = await this.createTeamUseCase.execute(gameJamId, body.name);


    const resp: CreateTeamResponseDto = {
      id: team.id,
      gameJamId: team.gameJamId,
      name: team.name,
      createdAt: team.createdAt,
    };
    return resp;
  }

  @Get(':teamId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a the team details including the members of it' })
  @ApiParam({ name: 'teamId', required: true, description: 'Team UUID' })
  @ApiResponse({ status: 201, description: 'Team created', type: CreateTeamResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async get(
    @Param('teamId') teamId: string,
    @Body() body: CreateTeamRequestDto
  ): Promise<CreateTeamResponseDto> {
    const team = await this.teamDetailUseCase.execute(teamId);
    
    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} nao encontrado`);
    }

    const resp: CreateTeamResponseDto = {
      id: team.id,
      gameJamId: team.gameJamId,
      name: team.name,
      createdAt: team.createdAt,
    };
    return resp;
  }
}
