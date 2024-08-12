import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs';

const UserSQL = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
}, {
  tableName: 'users', // Nom de la table en base de données
  timestamps: false,
});

export default UserSQL;
