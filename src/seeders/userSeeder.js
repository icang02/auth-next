import sequelize from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from 'bcrypt';


const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash('123', salt)

await sequelize.sync({ force: true });
User.bulkCreate([
  {
    name: 'Ilmi Faizan', email: 'ilmifaizan1112@gmail.com',
    address: 'Jl. Balai Kelurahan', password: hashPassword 
  },
  {
    name: 'Imam Saputra', email: 'imam@gmail.com',
    address: 'Ponrewaru, Kolaka', password: hashPassword
  },
])