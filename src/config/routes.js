import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App.js';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import _404 from '../components/_404.js';
import { availableLocales } from './config';

const routes = (
  <Route path="/" component={App}>
    <Route path="game/:gameId" component={Home} />
    <IndexRoute component={Login} />
    <Route path="404" component={_404} />
  </Route>);

export default routes;
