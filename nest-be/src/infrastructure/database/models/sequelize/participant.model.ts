import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { GameJamModel } from './gamejam.model';
import { TeamModel } from './team.model';

@Table({
  tableName: 'participants',
  timestamps: false,
})
export class ParticipantModel extends Model<ParticipantModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  user_id: string;

  @ForeignKey(() => GameJamModel)
  @Column(DataType.UUID)
  game_jam_id: string;

  @ForeignKey(() => TeamModel)
  @Column(DataType.UUID)
  team_id: string;

  @Column(DataType.DATE)
  joined_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsTo(() => GameJamModel, {as: 'participantGameJam'})
  gameJam: GameJamModel;

  @BelongsTo(() => TeamModel)
  team: TeamModel;
}
