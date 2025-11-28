import { Team } from "src/domain/entities/teams.entity";
import { TeamRepository } from "src/domain/repositories/team.repository";

export class TeamDetailUseCase {
    constructor(private readonly teamRepo: TeamRepository) {}
    async execute(teamId: string): Promise<Team | null> {
        if (!teamId) throw new Error('teamId is required');
        const team = await this.teamRepo.findById(teamId);
        return team;
    }
}