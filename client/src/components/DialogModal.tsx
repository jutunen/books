import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';
import BookDeleteDialog from './BookDeleteDialog';

function DialogModal() {
  const store = useContext(StoreContext);

  return (
    <Modal
      centered
      show={store.dialogModalIsVisible}
      onHide={() => store.hideDialogModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm book delete</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
        <BookDeleteDialog
          id={store.dialogModalContent.bookId}
          book={store.dialogModalContent.bookTitle}
        />
      </Modal.Body>
    </Modal>
  );
}

export default observer(DialogModal);
