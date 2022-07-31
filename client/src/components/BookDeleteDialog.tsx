import React, { useContext } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { StoreContext } from '../Store';
import * as api from '../api';

function BookDeleteDialog({ id, book }: { id: number; book: string }) {
  const store = useContext(StoreContext);

  async function handleSubmit() {
    store.showBusyIndicator();
    try {
      await api.sendDeleteRequest(id);
      store.deleteBook(id);
      store.setSelectedBookId(0);
      store.hideDialogModal();
    } catch (error: any) {
      store.showBookModal({
        title: 'Failed to delete the book',
        body: error.message
          ? error.message
          : 'Try again later.',
        button: 'Close',
      });
    }
    store.hideBusyIndicator();
  }

  return (
    <>
      <Row className='justify-content-center fs-5 mb-3'>
        <Col
          xs={6}
          className='d-flex justify-content-center'
          style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}
        >{`Delete ${book}?`}</Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={6} className='d-flex justify-content-center'>
          <Button type='submit' onClick={() => handleSubmit()} className='me-3'>
            Delete
          </Button>
          <Button className='ms-3' onClick={() => store.hideDialogModal()}>
            Cancel
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default BookDeleteDialog;
