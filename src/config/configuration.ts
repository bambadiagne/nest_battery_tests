import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
const typeOrmConfiguration: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  synchronize: process.env.NODE_ENV === 'development',
  autoLoadEntities: process.env.NODE_ENV === 'development',
  entities: [
    path.join(__dirname, '..', '**', '*.entity.{js,ts}'),
    path.join(__dirname, '..', 'dist', '**', '*.entity.{js,ts}'),
  ],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{js,ts}')],
  migrationsTableName: 'migrations',
};

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: typeOrmConfiguration,
});
