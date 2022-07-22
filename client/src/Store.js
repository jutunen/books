import { action, computed, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { books } from './testData';

class Store {
  books = books;
  selectedBookId = 0;

  constructor() {
    makeObservable(this, {
      books: observable,
      setBooks: action,
      selectedBookId: observable,
      setSelectedBookId: action,
    });
  }

  setBooks(books) {
    this.books = books;
  }

  setSelectedBookId(id) {
    this.selectedBookId = id;
  }

  getBookByBookId(id) {
    return this.books.find((book) => book.id === id);
  }
}

export const globalStore = new Store();
export const StoreContext = createContext(globalStore);
