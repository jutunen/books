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
          <Col xs={12} lg={6} className='app_left_col'>
            <BookTable />
          </Col>
          <Col xs={12} lg={6} className='app_right_col'>
            <BookForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
