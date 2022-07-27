import React from 'react';
import './App.css';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookTable from './components/BookTable';
import BookForm from './components/BookForm';
import BookModal from './components/BookModal';
import DialogModal from './components/DialogModal';
import BusyIndicator from './components/BusyIndicator';

function App() {
  return (
    <div className='App'>
      <Container fluid>
        <Row>
          <Col xs={12} lg={6} className='app-left-col'>
            <BookTable />
          </Col>
          <Col xs={12} lg={6} className='app-right-col'>
            <BookForm />
          </Col>
        </Row>
      </Container>
      <BookModal />
      <DialogModal />
      <BusyIndicator />
    </div>
  );
}

export default App;
