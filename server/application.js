/* eslint-disable no-console */
import { match, RouterContext } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import React from 'react';
import routes from '../src/config/routes';
import ReactDOM from 'react-dom/server';
import configureStore from '../src/redux/createStore';
import Html from '../src/html/Html';




export default (req, res) => {
  const memoryHistory = createHistory(req.originalUrl);
  const { store, history } = configureStore(memoryHistory);

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const app = (
        <Provider store={store} key="provider">
        <div>
          <RouterContext {...renderProps} />
        </div>
      </Provider>);
      const html = ReactDOM.renderToStaticMarkup(
        <Html
          store={store}
          component={app}
        />);

      res.status(200);
      res.type('html');
      res.send(`<!DOCTYPE html>${html}`);
      res.end();
    } else {
      res.status(404).send('Not f ds sd ound');
    }
  });
};


