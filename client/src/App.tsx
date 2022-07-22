import React from "react";
import "./App.css";
import { books } from "./testData";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => (
            <TableRow book={item} />
          ))}
        </tbody>
      </Table>
      <p>Total count: {books.length}</p>
    </div>
  );
}

function TableRow({ book }: { book: Book }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
    </tr>
  );
}

export default App;
