import React from 'react';
import './App.css';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookTable from './components/BookTable';
import BookForm from './components/BookForm';

function App() {
  return (
    <div className='App'>
      <Container fluid>
        <Row>
          <Col xs={12} md={6}>
            <BookTable />
          </Col>
          <Col xs={12} md={6}>
            <BookForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
