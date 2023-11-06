import { Sequelize } from "sequelize";
import sequelize from "@/dbConfig/dbConfig";

const User = sequelize.define('users', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.DataTypes.STRING,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
},
{
  freezeTableName: true,
  timestamps: false
})

export default User