import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './src/category/entity/category.entity';
import { Task } from './src/task/entity/task.entity';
import { Checklist } from './src/checklist/entity/checklist.entity';

const TYPEORM_HOST = process.env.TYPEORM_HOST || 'localhost';

export const configs = {
    type: 'postgres',
    host: TYPEORM_HOST, // 'react-to-do_postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'react-to-do',
    entities: [Category, Task, Checklist],
    // entities: [path.resolve(`${__dirname}/dist/src/**/entity/**.entity{.ts,.js}`)],
    migrationsRun: false, // runs init migration based on entities on startup
    migrations: [
      path.resolve(`${__dirname}/migrations/*{.ts,.js}`)
    ],
    synchronize: false, // will wipe db and create schema from scratch on startup (Always set to false when using migrations)
    // namingstrategy: new SnakeNamingStrategy(),
    cli: {
        migrationsDir: 'migrations/', // Directory for migration files
    },
    logging: true,
}

export const ormConfigFactory = async (configService: ConfigService) => ({
    ...configs
  });

// For NestJS `forRootAsync` usage
export const ormConfig: unknown | TypeOrmModuleAsyncOptions = {
    useFactory: ormConfigFactory,
    inject: [ConfigService],
  };


// For TypeORM CLI usage
const dataSource = new DataSource({
    type: 'postgres',
    host: configs.host,
    port: configs.port,
    username: configs.username,
    password: configs.password,
    database: configs.database,
    entities: configs.entities,
    synchronize: configs.synchronize,
    migrations: configs.migrations,
  });


export default dataSource;