import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { GameJamModel } from './gamejam.model';
import { TeamModel } from './team.model';
import { VoteModel } from './vote.model';

@Table({
  tableName: 'submissions',
  timestamps: false,
})
export class SubmissionModel extends Model<SubmissionModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => GameJamModel)
  @Column(DataType.UUID)
  game_jam_id: string;

  @ForeignKey(() => TeamModel)
  @Column(DataType.UUID)
  team_id: string;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  build_url: string;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => GameJamModel, {as: 'submissionGameJam'})
  gameJam: GameJamModel;

  @BelongsTo(() => TeamModel)
  team: TeamModel;

  @HasMany(() => VoteModel)
  votes: VoteModel[];
}
