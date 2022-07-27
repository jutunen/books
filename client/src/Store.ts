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
  busyIndicatorIsVisible = false;

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
      setBookDescription: action,
      busyIndicatorIsVisible: observable,
      showBusyIndicator: action,
      hideBusyIndicator: action,
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

  setBookDescription(id: number, description: string) {
    let index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books[index].description = description;
    }
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

  showBusyIndicator() {
    this.busyIndicatorIsVisible = true;
  }

  hideBusyIndicator() {
    this.busyIndicatorIsVisible = false;
  }

}

export const globalStore = new Store();
export const StoreContext = createContext(globalStore);
