import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
//import { books } from './testData';

class Store {
  //books = books;
  books: Book[] = [];
  selectedBookId = 0;
  newlyAddedBookId = 0; // <= a book id that server returns after succesfull save new request
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
      newlyAddedBookId: observable,
      setNewlyAddedBookId: action,
    });
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  setNewlyAddedBookId(id: number) {
    console.log(this.newlyAddedBookId);
    this.newlyAddedBookId = id;
    console.log(this.newlyAddedBookId);
  }

  deleteBook(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  setSelectedBookId(id: number) {
    this.selectedBookId = id;
  }

  getSelectedBook() {
    return this.books.find((book) => book.id === this.selectedBookId);
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
