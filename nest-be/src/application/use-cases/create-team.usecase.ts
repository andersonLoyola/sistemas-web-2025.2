import { Team } from '../../domain/entities/teams.entity';
import { TeamRepository } from '../../domain/repositories/team.repository';
import { randomUUID as uuidv4 } from 'node:crypto';

export class CreateTeamUseCase {
  constructor(private readonly teamRepo: TeamRepository) {}

  async execute(gameJamId: string, name: string): Promise<Team> {
    // basic invariants
    if (!gameJamId) throw new Error('gameJamId is required');
    if (!name || name.trim().length < 2) throw new Error('Invalid team name');

    // check duplicate name in same game jam
    const existing = await this.teamRepo.findByNameInGameJam(name.trim(), gameJamId);
    if (existing) {
      throw new Error('A team with this name already exists in the game jam');
    }

    const id = uuidv4();
    const now = new Date();
    const team = new Team(id, gameJamId, name.trim(), now);

    const created = await this.teamRepo.create(team);
    return created;
  }
}
