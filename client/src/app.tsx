import './app.scss';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import storePersist from '@/redux/storePersist';
import Router from '@/router/Router';

store.subscribe(() => {
  storePersist.saveState(store.getState());
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
