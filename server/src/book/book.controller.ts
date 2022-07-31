import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller('book')
export class BookController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<any[]> {
    return await this.knex('books').insert(createBookDto).returning('id');
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await this.knex('books').orderBy('title', 'asc');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<any[]> {
    return await this.knex('books')
      .where({ id })
      .update({ ...updateBookDto });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string): Promise<any[]> {
    return await this.knex('books').where({ id }).del();
  }
}
