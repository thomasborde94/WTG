import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs';

const LikedGameSQL = sequelize.define('LikedGame', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'email',
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
