// models/userSQL.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs'; // Assurez-vous que ceci pointe vers votre instance Sequelize

const UserSQL = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  // Vous pouvez ajouter d'autres champs si nécessaire
}, {
  tableName: 'users', // Nom de la table en base de données
  timestamps: false, // Désactiver les timestamps si vous ne les utilisez pas
});

export default UserSQL;
