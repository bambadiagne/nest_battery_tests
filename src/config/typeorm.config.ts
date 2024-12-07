import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  port: configService.get<number>('DB_PORT'),
  synchronize: false,
  entities: [
    path.join(__dirname, '..', '**', '*.entity.{js,ts}'),
    path.join(__dirname, '..', 'dist', '**', '*.entity.{js,ts}'),
  ],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{js,ts}')],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
