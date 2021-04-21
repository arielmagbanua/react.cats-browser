import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.scss';
import CatsNavbar from './features/cats/presentation/components/CatsNavbar';
import CatsBrowserPage from './features/cats/presentation/pages/CatsBrowserPage';
import CatBreedDetailsPage from './features/cats/presentation/pages/CatBreedDetailsPage';
import BreedsProvider from './features/cats/presentation/providers/BreedsProvider';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <BreedsProvider>
          <CatsNavbar/>
          <Container>
            <Switch>
              <Route exact path="/">
                <CatsBrowserPage/>
              </Route>
              <Route exact path="/:id">
                <CatBreedDetailsPage/>
              </Route>
            </Switch>
          </Container>
        </BreedsProvider>
      </div>
    </Router>
  );
}

export default App;
