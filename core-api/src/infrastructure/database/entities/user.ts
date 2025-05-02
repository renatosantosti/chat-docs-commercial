import {
  AutoIncrement,
  HasMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  Unique,
} from "sequelize-typescript";
import DocumentEntity from "./document";

@Table({ tableName: "User" })
export default class UserEntity extends Model<Partial<UserEntity>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;
  @Column(DataType.STRING)
  name!: string;
  @Column(DataType.STRING)
  password!: string;
  @Unique(true)
  @Column(DataType.STRING)
  email!: string;
  @Column(DataType.STRING)
  image?: string;
  @Column(DataType.STRING)
  profile?: string;
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  /* Blamed fields */
  @CreatedAt
  createdOn!: Date;
  @Column(DataType.STRING)
  createdBy!: string;
  @UpdatedAt
  modifiedOn?: Date;
  @Column(DataType.STRING)
  modifiedBy!: string;
  @DeletedAt
  deletionDate?: Date;
  /* End blamed fields */

  /* Relationships*/
  @HasMany(() => DocumentEntity)
  documents?: DocumentEntity[];
  /* End relationships*/
}
