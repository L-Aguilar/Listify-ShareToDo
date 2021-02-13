import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './scss/main.scss';
import NewList from './components/NewList';
import GetList from './components/PublicList/GetList';


function App() {

  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <NewList />
          </Route>
          <Route path="/newList">
            <NewList />
          </Route>
          <Route path="/list/:id">
            <GetList/>
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
