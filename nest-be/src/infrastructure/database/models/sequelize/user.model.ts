import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { CompanyModel } from './company.model';
import { SubscriptionModel } from './subscription.model';
import { ParticipantModel } from './participant.model';
import { VoteModel } from './vote.model';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class UserModel extends Model<UserModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password_hash: string;

  @Column(DataType.TEXT)
  bio: string;

  @Column(DataType.STRING)
  role: string;

  @Column(DataType.DATE)
  created_at: Date;

  @HasOne(() => CompanyModel)
  company: CompanyModel;

  @HasMany(() => SubscriptionModel)
  subscriptions: SubscriptionModel[];

  @HasMany(() => ParticipantModel)
  participants: ParticipantModel[];

  @HasMany(() => VoteModel)
  votes: VoteModel[];
}
