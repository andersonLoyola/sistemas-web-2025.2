import { TeamMember } from "src/domain/entities/team-member.entity";

export class GetTeamDetailsResponseDto {
    id!: string;
    teamId!: string;
    name!: string;
    members!: Array<TeamMember>;
}