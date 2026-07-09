import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl:
      process.env.DB_SSL === 'false'
        ? false
        : {
            require: true,
            rejectUnauthorized: false,
          },
  },
});

export async function connectDb() {
  await sequelize.authenticate();
  console.log('Database connection successful');
}

export default sequelize;
