import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import '../styles/BusyIndicator.css';
import { StoreContext } from '../Store';
import { observer } from 'mobx-react-lite';

function BusyIndicator() {
  const store = useContext(StoreContext);

  if (!store.busyIndicatorIsVisible) {
    return null;
  }

  return (
    <div className='busy-indicator'>
      <div className='busy-indicator-shadow'>
        <Spinner animation='border' role='status' variant='primary' />
      </div>
    </div>
  );
}

export default observer(BusyIndicator);
