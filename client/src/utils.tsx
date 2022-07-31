import * as api from './api';

export async function fetchAllBooks(store: any) {
  try {
    const response = await api.sendGetRequest('book');
    // console.log(response.data);
    store.setBooks(response.data);
    return true;
  } catch (error: any) {
    store.showBookModal({
      title: 'Failed to fetch the books',
      body: error.message ? error.message : 'Try again later.',
      button: 'Close',
    });
    return false;
  }
}
