import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SubmissionModel } from './submission.model';
import { UserModel } from './user.model';

@Table({
  tableName: 'votes',
  timestamps: false,
})
export class VoteModel extends Model<VoteModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => SubmissionModel)
  @Column(DataType.UUID)
  submission_id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  user_id: string;

  @Column(DataType.INTEGER)
  score: number;

  @Column(DataType.TEXT)
  comment: string;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => SubmissionModel)
  submission: SubmissionModel;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
