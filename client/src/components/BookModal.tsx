import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';

function BookModal() {
  const store = useContext(StoreContext);

  return (
    <Modal
      centered
      show={store.bookModalIsVisible}
      onHide={() => store.hideBookModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{store.bookModalContent.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
        {store.bookModalContent.body}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          style={{ color: 'white' }}
          onClick={() => store.hideBookModal()}
        >
          {store.bookModalContent.button}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(BookModal);
