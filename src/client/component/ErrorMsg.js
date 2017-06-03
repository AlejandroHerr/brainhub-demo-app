import React from 'react';
import PropTypes from 'prop-types';

const ErrorMsg = ({ error }) => (<p className="validation-error h6 m1 mt0">{error}</p>);

ErrorMsg.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMsg;
