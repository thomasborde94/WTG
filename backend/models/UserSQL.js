// models/UserSQL.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.cjs'; // Adjust the path to your Sequelize instance

// Define the User model for PostgreSQL
const UserSQL = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users', // Ensure this matches your PostgreSQL table name
  timestamps: false, // Disable automatic updatedAt column
});

export default UserSQL;
