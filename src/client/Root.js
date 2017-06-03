import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import 'basscss/css/basscss.min.css';
import Form from './container/Form';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <h1>Hello World!</h1>
      <Form />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
