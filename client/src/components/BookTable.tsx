import React, { useContext, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';
import '../styles/BookTable.css';
import { fetchAllBooks } from '../utils';

function BookTable() {
  const store = useContext(StoreContext);

  // ref is used to scroll the table so that the new saved book row becomes visible:
  const bookRowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      store.showBusyIndicator();
      await fetchAllBooks(store);
      store.hideBusyIndicator();
    };
    fetchBooks();
  }, [store]);

  useEffect(() => {
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
  }, [store, store.newlyAddedBookId]);

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
              selectedBookId={store.selectedBookId}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

function TableRow({
  book,
  reference,
  selectedBookId,
}: {
  book: Book;
  reference: any;
  selectedBookId: number;
}) {
  const store = useContext(StoreContext);

  const selectedBorderStyle = '2px solid blue';
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
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          store.setSelectedBookId(Number(book.id));
        }
      }}
      tabIndex={0}
      className='tablerow'
    >
      <td style={book.id === selectedBookId ? selectedCellStyleLeft : {}}>
        {book.title}
      </td>
      <td style={book.id === selectedBookId ? selectedCellStyleRight : {}}>
        {book.author}
      </td>
    </tr>
  );
}

export default observer(BookTable);
