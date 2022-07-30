import { Length, Matches } from 'class-validator';

export class CreateBookDto {
  @Length(1,50)
  @Matches(/\S+/)
  title: string;

  @Length(1,50)
  @Matches(/\S+/)
  author: string;

  @Length(1,500)
  @Matches(/\S+/)
  description: string;
}
