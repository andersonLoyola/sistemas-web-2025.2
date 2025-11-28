import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  tableName: 'subscriptions',
  timestamps: false,
})
export class SubscriptionModel extends Model<SubscriptionModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  user_id: string;

  @Column(DataType.STRING)
  status: string;

  @Column(DataType.STRING)
  plan: string;

  @Column(DataType.DATE)
  started_at: Date;

  @Column(DataType.DATE)
  expires_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
