import * as dotenv from 'dotenv';

dotenv.config();

const { HTTP_PORT, DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SYNCHRONIZE } = process.env;

export default () => ({
  HTTP_PORT: HTTP_PORT,
  POSTGRES_DB_SETTINGS: {
    type: DB_TYPE,
    host: DB_HOST,
    port: Number(DB_PORT) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    autoLoadEntities: true,
    synchronize: DB_SYNCHRONIZE,
  },
});
