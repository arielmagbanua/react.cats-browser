import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';
import CatsNavbar from './features/cats/presentation/components/CatsNavbar';
import CatsBrowser from './features/cats/presentation/components/CatsBrowser';
import CatBreedDetails from './features/cats/presentation/components/CatBreedDetails';
import BreedsProvider from './features/cats/providers/BreedsProvider';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <BreedsProvider>
          <CatsNavbar/>
          <Container>
            <Switch>
              <Route exact path="/">
                <CatsBrowser/>
              </Route>
              <Route exact path="/:id">
                <CatBreedDetails/>
              </Route>
            </Switch>
          </Container>
        </BreedsProvider>
      </div>
    </Router>
  );
}

export default App;
