import React, { useState, useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMsg_1, setErrorMsg_1] = useState('');
  const [errorMsg_2, setErrorMsg_2] = useState('');

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
    }
  }, [store, store.selectedBookId]);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='string'
          placeholder='book title'
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          isInvalid={!!validated && !!errorMsg_1}
        />
        <Form.Control.Feedback type='invalid'>
          {errorMsg_1}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type='string'
          placeholder='book author'
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
          isInvalid={!!validated && !!errorMsg_1}
        />
        <Form.Control.Feedback type='invalid'>
          {errorMsg_1}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea" 
          rows={5}
          type='string'
          placeholder='book description'
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          isInvalid={!!validated && !!errorMsg_1}
        />
        <Form.Control.Feedback type='invalid'>
          {errorMsg_1}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default observer(BookForm);
