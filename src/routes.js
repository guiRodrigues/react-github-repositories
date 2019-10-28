// In react, everything are components, and we need to export a functional component that give to us a ROUTE functionality
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    // BrowserRouter is a kind of router
    // Switch allow us to render one only component
    // Route is just a component that will be rendered
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
