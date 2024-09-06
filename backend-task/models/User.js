const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true }, // Adicionado campo para nome de usuário
  fullName: { type: DataTypes.STRING, allowNull: false }, // Adicionado campo para nome completo
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  timestamps: true, // Adiciona automaticamente createdAt e updatedAt
});

User.prototype.matchPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User;
