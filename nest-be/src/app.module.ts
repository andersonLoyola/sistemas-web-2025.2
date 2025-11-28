import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamModule } from './modules/teams/team.module';
import { TeamModel } from './infrastructure/database/models/sequelize/team.model';
import { GameJamModel } from './infrastructure/database/models/sequelize/gamejam.model';
import { CompanyModel } from './infrastructure/database/models/sequelize/company.model';
import { ParticipantModel } from './infrastructure/database/models/sequelize/participant.model';
import { RankingModel } from './infrastructure/database/models/sequelize/ranking.model';
import { SubmissionModel } from './infrastructure/database/models/sequelize/submission.model';
import { SubscriptionModel } from './infrastructure/database/models/sequelize/subscription.model';
import { TeamMemberModel } from './infrastructure/database/models/sequelize/team-member.model';
import { UserModel } from './infrastructure/database/models/sequelize/user.model';
import { VoteModel } from './infrastructure/database/models/sequelize/vote.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER ?? 'laravel',
      password: process.env.DB_PASSWORD ?? 'root',
      database: process.env.DB_NAME ?? 'laravel',
      models: [
        TeamModel, 
        GameJamModel, 
        CompanyModel, 
        ParticipantModel, 
        RankingModel, 
        SubmissionModel, 
        SubscriptionModel, 
        TeamMemberModel, 
        UserModel, 
        VoteModel
      ],
      autoLoadModels: true,
      synchronize: false,
      logging: false,
    }),
    TeamModule,
  ],
})
export class AppModule { }