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
  // const [validated, setValidated] = useState(false);
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [authorErrorMsg, setAuthorErrorMsg] = useState('');
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState('');

  const store = useContext(StoreContext);

  useEffect(() => {
    console.log('BookForm useEffect!');
    if (store.selectedBookId) {
      let book = store.getBookByBookId(store.selectedBookId);
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
  }, [store, store.selectedBookId]);

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
    if (!validateInputs()) {
      return;
    }

    let book: Book = {
      title,
      author,
      description,
    };

    try {
      let result = await api.saveNewRequest(book);
      console.log('result:');
      console.log(result);
      console.log(result.data[0].id);
      if (result?.data[0]?.id) {
        store.setBookIdToBeSelectedAfterBooksFetch(result?.data[0]?.id);
      }
    } catch (error) {
      //store.showErrorModal();
    }
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
        />
        <Form.Control.Feedback type='invalid'>
          {titleErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type='string'
          placeholder='book author'
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
          isInvalid={!!authorErrorMsg}
        />
        <Form.Control.Feedback type='invalid'>
          {authorErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={5}
          type='string'
          placeholder='book description'
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          isInvalid={!!descriptionErrorMsg}
        />
        <Form.Control.Feedback type='invalid'>
          {descriptionErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant='primary' onClick={() => handleSaveNew()}>
        Save new
      </Button>
      <Button variant='primary'>Save</Button>
      <Button
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
