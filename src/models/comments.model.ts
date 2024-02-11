import { DataTypes, Model } from 'sequelize'
import { sequelize } from '@utils'

export interface CommentDocument {
  id?: number
  email: string
  text: string
}

export class Comment extends Model<CommentDocument> {
  public id!: number
  public email!: string
  public text!: string
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    text: {
      type: new DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    tableName: 'comments',
    sequelize,
    timestamps: true
  }
)
