import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs';

// Définition du modèle pour les jeux liked dans la base SQL
const LikedGameSQL = sequelize.define('LikedGame', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'email', // Clé étrangère, de la table users
    },
  },
  game_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'liked_games',
  timestamps: false,
});

export default LikedGameSQL;
