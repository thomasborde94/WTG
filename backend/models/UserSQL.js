import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs';

// Définition du modèle pour les utilisateurs dans la base SQL
const UserSQL = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // unique et non nulle, sert d'identifiant
    unique: true,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default UserSQL;
