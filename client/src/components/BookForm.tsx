import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';
import '../styles/BookForm.css';
import * as api from '../api';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [authorErrorMsg, setAuthorErrorMsg] = useState('');
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState('');

  const store = useContext(StoreContext);

  useEffect(() => {
    console.log('BookForm useEffect!');
    if (store.selectedBookId) {
      let book = store.getSelectedBook();
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
      }
    } else {
      setTitle('');
      setAuthor('');
      setDescription('');
    }
    setTitleErrorMsg('');
    setAuthorErrorMsg('');
    setDescriptionErrorMsg('');
  }, [store, store.selectedBookId]);

  function titleAndAuthorAreIntact() {
    let selectedBook = store.getSelectedBook();
    if (selectedBook) {
      if (
        title.trim() === selectedBook.title &&
        author.trim() === selectedBook.author
      ) {
        return true;
      }
    }
    return false;
  }

  function descriptionIsIntact() {
    let selectedBook = store.getSelectedBook();
    if (selectedBook) {
      if (description.trim() === selectedBook.description) {
        return true;
      }
    }
    return false;
  }

  function validateInputs() {
    let inputsAreValid = true;
    if (title.trim().length === 0) {
      setTitleErrorMsg('Add title');
      inputsAreValid = false;
    } else {
      setTitleErrorMsg('');
    }
    if (author.trim().length === 0) {
      setAuthorErrorMsg('Add author');
      inputsAreValid = false;
    } else {
      setAuthorErrorMsg('');
    }
    if (description.trim().length === 0) {
      setDescriptionErrorMsg('Add description');
      inputsAreValid = false;
    } else {
      setDescriptionErrorMsg('');
    }
    return inputsAreValid;
  }

  async function handleSaveNew() {
    store.showBusyIndicator();
    if (!validateInputs()) {
      return;
    }

    let book: Book = {
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
    };

    try {
      let result = await api.saveNewRequest(book);
      if (result?.data[0]?.id) {
        store.setNewlyAddedBookId(result?.data[0]?.id);
      }
    } catch (error: any) {
      store.showBookModal({
        title: 'Failed to save the book',
        body: error.message ? error.message : 'Try again later.',
        button: 'Close',
      });
    }
    store.hideBusyIndicator();
  }

  async function handleSave() {
    store.showBusyIndicator();
    if (!validateInputs()) {
      return;
    }

    let book: BookPatch = {
      description: description.trim(),
    };

    try {
      await api.saveRequest(store.selectedBookId, book);
      store.setBookDescription(store.selectedBookId, book.description);
    } catch (error: any) {
      store.showBookModal({
        title: 'Failed to save the book',
        body: error.message ? error.message : 'Try again later.',
        button: 'Close',
      });
    }
    store.hideBusyIndicator();
  }

  return (
    <Form id='bookform'>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='string'
          placeholder='book title'
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          isInvalid={!!titleErrorMsg}
          maxLength={50}
        />
        <Form.Control.Feedback type='invalid'>
          {titleErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type='string'
          placeholder='book author'
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
          isInvalid={!!authorErrorMsg}
          maxLength={50}
        />
        <Form.Control.Feedback type='invalid'>
          {authorErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={5}
          type='string'
          placeholder='book description'
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          isInvalid={!!descriptionErrorMsg}
          maxLength={500}
        />
        <Form.Control.Feedback type='invalid'>
          {descriptionErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        disabled={titleAndAuthorAreIntact() ? true : false}
        variant='primary'
        onClick={() => handleSaveNew()}
      >
        Save new
      </Button>
      <Button
        disabled={
          (titleAndAuthorAreIntact() ? false : true) || descriptionIsIntact()
        }
        variant='primary'
        onClick={() => handleSave()}
      >
        Save
      </Button>
      <Button
        disabled={titleAndAuthorAreIntact() ? false : true}
        variant='primary'
        onClick={() =>
          store.showDialogModal({
            bookId: store.selectedBookId,
            bookTitle: title,
          })
        }
      >
        Delete
      </Button>
    </Form>
  );
}

export default observer(BookForm);
