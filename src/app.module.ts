import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModels } from './users/users.module';

import { User } from './users/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'new_portfolio',
    entities: [User],
    synchronize: true,
  }), UserModels],
  controllers: [],
  providers: [],
})
export class AppModule {
}
