import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { CompanyModel } from './company.model';
import { ParticipantModel } from './participant.model';
import { TeamModel } from './team.model';
import { SubmissionModel } from './submission.model';
import { RankingModel } from './ranking.model';

@Table({
  tableName: 'game_jams',
  timestamps: false,
})
export class GameJamModel extends Model<GameJamModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  creator_user_id: string;

  @ForeignKey(() => CompanyModel)
  @Column(DataType.UUID)
  creator_company_id: string;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  type: string;

  @Column(DataType.DATE)
  start_date: Date;

  @Column(DataType.DATE)
  end_date: Date;

  @Column(DataType.BOOLEAN)
  is_private: boolean;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => UserModel)
  creatorUser: UserModel;

  @BelongsTo(() => CompanyModel)
  creatorCompany: CompanyModel;

  @HasMany(() => ParticipantModel)
  participants: ParticipantModel[];

  @HasMany(() => TeamModel)
  teams: TeamModel[];

  @HasMany(() => SubmissionModel)
  submissions: SubmissionModel[];

  @HasMany(() => RankingModel)
  rankings: RankingModel[];
}
