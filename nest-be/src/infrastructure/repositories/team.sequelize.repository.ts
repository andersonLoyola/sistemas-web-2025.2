import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeamRepository } from '../../domain/repositories/team.repository';
import { Team } from '../../domain/entities/teams.entity';
import { TeamModel } from '../database/models/sequelize/team.model'

@Injectable()
export class TeamSequelizeRepository implements TeamRepository {
  constructor(
    @InjectModel(TeamModel)
    private readonly teamModel: typeof TeamModel
  ) {}

  private toDomain(model: TeamModel): Team {
    return new Team(
      model.id,
      model.game_jam_id,
      model.name,
      model.created_at
    );
  }

  async create(team: Team): Promise<Team> {
    const created =  this.teamModel.build({
      id: team.id,
      game_jam_id: team.gameJamId,
      name: team.name,
      created_at: team.createdAt,
    });

    await created.save();
    return this.toDomain(created);
  }

  async findById(id: string): Promise<Team | null> {
    const model = await this.teamModel.findByPk(id, {
      include: [
        
      ]
    });
    if (!model) return null;
    return this.toDomain(model);
  }

  async findByNameInGameJam(name: string, gameJamId: string): Promise<Team | null> {
    const model = await this.teamModel.findOne({
      where: { name, game_jam_id: gameJamId },
    });
    return model ? this.toDomain(model) : null;
  }
}
