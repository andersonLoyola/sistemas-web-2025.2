import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { GameJamModel } from './gamejam.model';
import { TeamMemberModel } from './team-member.model';
import { SubmissionModel } from './submission.model';



export interface TeamCreationAttributes {
  id: string;
  game_jam_id: string;
  name: string;
  created_at: Date;
}


@Table({
  tableName: 'teams',
  timestamps: false,
})
export class TeamModel extends Model<TeamModel, TeamCreationAttributes> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => GameJamModel)
  @Column(DataType.UUID)
  game_jam_id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => GameJamModel)
  gameJam: GameJamModel;

  @HasMany(() => TeamMemberModel)
  members: TeamMemberModel[];

  @HasMany(() => SubmissionModel)
  submissions: SubmissionModel[];
}
