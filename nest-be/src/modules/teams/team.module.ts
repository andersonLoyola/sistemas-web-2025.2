import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamModel } from '../../infrastructure/database/models/sequelize/team.model';
import { TeamSequelizeRepository } from '../../infrastructure/repositories/team.sequelize.repository';
import { TeamsController } from '../../presenters/controllers/teams.controller';
import { CreateTeamUseCase } from '../../application/use-cases/create-team.usecase';

@Module({
  imports: [SequelizeModule.forFeature([TeamModel])],
  controllers: [TeamsController],
  providers: [
    {
      provide: 'TeamRepository',
      useClass: TeamSequelizeRepository,
    },
    {
      provide: CreateTeamUseCase,
      useFactory: (repo: any) => new CreateTeamUseCase(repo),
      inject: ['TeamRepository'],
    },
    TeamSequelizeRepository, 
  ],
  exports: [],
})
export class TeamModule {}
