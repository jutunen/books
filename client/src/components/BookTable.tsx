import React, { useContext, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';
import * as api from '../api';

function BookTable() {
  const store = useContext(StoreContext);

  // ref is used to scroll the table so that the new saved book row becomes visible:
  const bookRowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      //store.showAppLoader();
      try {
        const response = await api.getRequest('book');
        // console.log(response.data);
        store.setBooks(response.data);
        if (store.newlyAddedBookId) {
          store.setSelectedBookId(Number(store.newlyAddedBookId));
          setTimeout(() => {
            if (bookRowRef.current) {
              bookRowRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          }, 5);
        }
      } catch (error) {
        //store.showModal(getModalErrorContent(url, error?.response?.status));
      }
      //store.hideAppLoader();
    };
    fetchAllBooks();
  }, [store, store.newlyAddedBookId]);

  console.log('BookTable render!');

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {store.books.map((item) => (
            <TableRow
              key={item.id}
              book={item}
              reference={item.id === store.newlyAddedBookId ? bookRowRef : null}
            />
          ))}
        </tbody>
      </Table>
      <p>Total count: {store.books.length}</p>
      <p>Currently selected: {store.selectedBookId}</p>
    </>
  );
}

function TableRow({ book, reference }: { book: Book; reference: any }) {
  const store = useContext(StoreContext);

  const selectedBorderStyle = '2px solid green';
  const selectedCellStyleLeft = {
    borderLeft: selectedBorderStyle,
    borderBottom: selectedBorderStyle,
    borderTop: selectedBorderStyle,
  };
  const selectedCellStyleRight = {
    borderRight: selectedBorderStyle,
    borderBottom: selectedBorderStyle,
    borderTop: selectedBorderStyle,
  };

  return (
    <tr
      ref={reference ? reference : null}
      onClick={() => store.setSelectedBookId(Number(book.id))}
    >
      <td style={book.id === store.selectedBookId ? selectedCellStyleLeft : {}}>
        {book.title}
      </td>
      <td
        style={book.id === store.selectedBookId ? selectedCellStyleRight : {}}
      >
        {book.author}
      </td>
    </tr>
  );
}

export default observer(BookTable);
