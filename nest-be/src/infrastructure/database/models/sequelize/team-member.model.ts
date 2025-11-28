import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TeamModel } from './team.model';
import { UserModel } from './user.model';

@Table({
  tableName: 'team_members',
  timestamps: false,
})
export class TeamMemberModel extends Model<TeamMemberModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => TeamModel)
  @Column(DataType.UUID)
  team_id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  user_id: string;

  @BelongsTo(() => TeamModel)
  team: TeamModel;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
