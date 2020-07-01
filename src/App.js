import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Bookings from './routes/Bookings';
import Home from './routes/Home';
import Navigation from './routes/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path='/booking' exact={true} component={Bookings} />
      <Route path='/' exact={true} component={Home} />
    </BrowserRouter>
  );
}

export default App;
