import React from 'react';
import { Container } from '@material-ui/core';

import Bookings from './Bookings';
class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Container>
          <Bookings />
        </Container>
      </div>
    );
  }
}

export default App;
