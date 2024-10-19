import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { ChecklistModule } from './checklist/checklist.module';
import { configs, ormConfig, ormConfigFactory } from '../ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This allows ConfigService to be used globally
    }),
    TypeOrmModule.forRootAsync(ormConfig),
    CategoryModule,
    TaskModule,
    ChecklistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
