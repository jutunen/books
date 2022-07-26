import { action, computed, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
//import { books } from './testData';

class Store {
  //books = books;
  books: Book[] = [];
  selectedBookId = 0;
  modalIsVisible = false;
  modalContent: any = {};

  constructor() {
    makeObservable(this, {
      books: observable,
      setBooks: action,
      selectedBookId: observable,
      setSelectedBookId: action,
      modalIsVisible: observable,
      showModal: action,
      hideModal: action,
    });
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  setSelectedBookId(id: number) {
    this.selectedBookId = id;
  }

  getBookByBookId(id: number) {
    return this.books.find((book) => book.id === id);
  }

  showModal(content: any) {
    this.modalContent.title = content.title;
    this.modalContent.body = content.body;
    this.modalContent.button = content.button;
    this.modalIsVisible = true;
  }

  hideModal() {
    this.modalIsVisible = false;
  }
}

export const globalStore = new Store();
export const StoreContext = createContext(globalStore);
