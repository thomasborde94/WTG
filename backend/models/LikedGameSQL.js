// models/LikedGameSQL.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs';

const LikedGameSQL = sequelize.define('LikedGame', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users', // Assurez-vous que le nom de la table est correct
      key: 'email',
    },
  },
  game_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true, // Vous pouvez ajuster selon vos besoins
  },
}, {
  tableName: 'liked_games',
  timestamps: false,
});

export default LikedGameSQL;
