import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SubmissionModel } from './submission.model';
import { GameJamModel } from './gamejam.model';

@Table({
  tableName: 'rankings',
  timestamps: false,
})
export class RankingModel extends Model<RankingModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => SubmissionModel)
  @Column(DataType.UUID)
  submission_id: string;

  @ForeignKey(() => GameJamModel)
  @Column(DataType.UUID)
  game_jam_id: string;

  @Column(DataType.INTEGER)
  position: number;

  @BelongsTo(() => SubmissionModel)
  submission: SubmissionModel;

  @BelongsTo(() => GameJamModel, {as: 'rankingGameJam'})
  gameJam: GameJamModel;
}
