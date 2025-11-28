import { Team } from '../entities/teams.entity';

export interface TeamRepository {
  create(team: Team): Promise<Team>;
  findById(id: string): Promise<Team | null>;
  findByNameInGameJam(name: string, gameJamId: string): Promise<Team | null>;
}
