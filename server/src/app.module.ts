import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    BookModule,
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {
          database: 'books',
          user: 'books',
          password: 'books',
        },
        pool: {
          min: 2,
          max: 10,
        },
      },
    }),
  ],
})
export class AppModule {}
