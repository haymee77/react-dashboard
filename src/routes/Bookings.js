import React from 'react';
import { Container } from '@material-ui/core';

import BookingTable from '../components/BookingTable';

class Bookings extends React.Component {
  render() {
    return (
      <div className='App'>
        <Container>
          <BookingTable />
        </Container>
      </div>
    );
  }
}

export default Bookings;
