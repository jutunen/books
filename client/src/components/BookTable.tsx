import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';

function BookTable() {
  const store = useContext(StoreContext);

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
            <TableRow key={item.id} book={item} />
          ))}
        </tbody>
      </Table>
      <p>Total count: {store.books.length}</p>
      <p>Currently selected: {store.selectedBookId}</p>
    </>
  );
}

function TableRow({ book }: { book: Book }) {
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
      onClick={() => store.setSelectedBookId(book.id)}
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
