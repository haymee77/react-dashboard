import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Bookings from './routes/Bookings';
import Home from './routes/Home';
import Navigation from './routes/Navigation';

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path='/booking' exact={true} component={Bookings} />
      <Route path='/' exact={true} component={Home} />
    </HashRouter>
  );
}

export default App;
