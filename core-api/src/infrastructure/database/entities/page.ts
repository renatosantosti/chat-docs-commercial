import { AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import DocumentEntity from "./document";

@Table({ tableName: "Page" })
export default class PageEntity extends Model<Partial<PageEntity>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;
  @Column(DataType.INTEGER)
  pageNumber!: number;
  @Column(DataType.STRING)
  text!: string;
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  /* Blamed fields */
  @CreatedAt
  createdOn!: Date;
  @Column(DataType.STRING)
  createdBy!: string
  @UpdatedAt
  modifiedOn?: Date;
  @Column(DataType.STRING)
  modifiedBy!: string
  @DeletedAt
  deletionDate?: Date;
  /* End blamed fields */

  /* ForeignKey Fields*/
  @Column(DataType.INTEGER)
  @ForeignKey(() => DocumentEntity)
  documentId!: number;

  @BelongsTo(() => DocumentEntity)
  document!: DocumentEntity;
}

