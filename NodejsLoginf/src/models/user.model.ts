import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export interface UserAttributes {
  id?: number;
  name: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public password!: string;
    public email!: string;
    public role!: 'user' | 'admin';;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;



