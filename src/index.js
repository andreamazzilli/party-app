import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './bootstrap.css';
import './index.css';
import Root from './pages/root';
import Game from './pages/game';
//import Tracker from './pages/tracker';
//import Apis from './pages/apis';
import Navigation from './components/navigation'
//import Mouse from './components/mouse'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Fragment>
        <Navigation />
        <Route exact path="/" component={ Root } />
        <Route exact path="/games/:game" component={ Game } />
      </Fragment>
    </Router>
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
