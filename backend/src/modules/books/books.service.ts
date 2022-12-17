import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/books.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>
  ){}

  create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  findOne(id: number) {
    return this.bookModel.findById(id).exec();
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  remove(id: number) {
    return this.bookModel.findByIdAndDelete(id);
  }
}