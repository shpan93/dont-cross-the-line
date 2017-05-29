import React from 'react';
import { Route } from 'react-router';
import App from '../App.js';
import Home from '../components/Home.js';
import _404 from '../components/_404.js';
import { availableLocales } from './config';

const checkLanguage = (nextState, replace) => {
  const testResult = availableLocales(nextState.params.language);
  if (testResult.contains) {
    if (testResult.locale === nextState.params.language) {
      return null;
    }
    replace(`/${testResult.locale}`);
  } else {
    replace('/en');
  }
  return null;
};

const routes = (
  <Route path="/" component={App}>
    <Route path=":language" component={Home} />
    <Route path="404" component={_404} />
  </Route>);

export default routes;
