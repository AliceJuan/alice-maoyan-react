import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router'
import {Provider} from 'react-redux'
// import {AppContainer} from 'react-hot-loader'
import store from './redux/store'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
      <Router/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
