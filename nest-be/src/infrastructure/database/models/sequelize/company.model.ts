import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  tableName: 'companies',
  timestamps: false,
})
export class CompanyModel extends Model<CompanyModel> {

  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  user_id: string;

  @Column(DataType.STRING)
  company_name: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
