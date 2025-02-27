import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { Todo, TodoSchema } from './todo/database/model';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URL') ||
          `mongodb://${configService.get('MONGODB_HOST')}:${configService.get('MONGODB_PORT')}`,
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASSWORD'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
        authSource: configService.get<string>('MONGODB_AUTHSOURCE') || 'admin',
        directConnection: true,
      }),
    }),
    TodoModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
