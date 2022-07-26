import { action, computed, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
//import { books } from './testData';

class Store {
  //books = books;
  books: Book[] = [];
  selectedBookId = 0;
  bookIdToBeSelectedAfterBooksFetch = 0;
  bookModalIsVisible = false;
  bookModalContent: any = {};
  dialogModalIsVisible = false;
  dialogModalContent: any = {};

  constructor() {
    makeObservable(this, {
      books: observable,
      setBooks: action,
      deleteBook: action,
      selectedBookId: observable,
      setSelectedBookId: action,
      bookModalIsVisible: observable,
      showBookModal: action,
      hideBookModal: action,
      dialogModalIsVisible: observable,
      showDialogModal: action,
      hideDialogModal: action,
      bookIdToBeSelectedAfterBooksFetch: observable,
      setBookIdToBeSelectedAfterBooksFetch: action,
    });
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  setBookIdToBeSelectedAfterBooksFetch(id: number) {
    console.log(this.bookIdToBeSelectedAfterBooksFetch);
    this.bookIdToBeSelectedAfterBooksFetch = id;
    console.log(this.bookIdToBeSelectedAfterBooksFetch);
  }

  deleteBook(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  setSelectedBookId(id: number) {
    this.selectedBookId = id;
  }

  getBookByBookId(id: number) {
    return this.books.find((book) => book.id === id);
  }

  showBookModal(content: any) {
    this.bookModalContent.title = content.title;
    this.bookModalContent.body = content.body;
    this.bookModalContent.button = content.button;
    this.bookModalIsVisible = true;
  }

  hideBookModal() {
    this.bookModalIsVisible = false;
  }

  showDialogModal(content: any) {
    this.dialogModalContent.bookId = content.bookId;
    this.dialogModalContent.bookTitle = content.bookTitle;
    this.dialogModalIsVisible = true;
  }

  hideDialogModal() {
    this.dialogModalIsVisible = false;
  }
}

export const globalStore = new Store();
export const StoreContext = createContext(globalStore);
