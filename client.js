import React from 'react';
import { Router } from 'react-router';
import ReactDOM from 'react-dom';
import configureStore from './src/redux/createStore';
import { browserHistory } from 'react-router';
import DevTools from './src/redux/DevTools';
import { Provider } from 'react-redux';
import routes from './src/config/routes';


const { store, history } = configureStore(browserHistory, window.App);

const Application = () => {
  return (
  <Provider store={store} key="provider">
    <div>
      <Router history={history} routes={routes} />
      {process.env.NODE_ENV === 'development' ? <DevTools store={store} /> : null}
    </div>
  </Provider>);
};

ReactDOM.render(<Application />, document.getElementById('app'));
