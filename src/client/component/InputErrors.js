import React from 'react';
import PropTypes from 'prop-types';
import branch from 'recompose/branch';
import renderNothing from 'recompose/renderNothing';
import map from 'lodash/map';
import size from 'lodash/size';
import ErrorMsg from './ErrorMsg';

const hideIfNoErrors = hasErrors =>
  branch(
    hasErrors,
    renderNothing,
  );

const enhance = hideIfNoErrors(
  props => size(props.errors) === 0,
);
const InputErrors = ({ errors }) => (
  <div className="border-box sm-col col-12 mx-auto my1 pl1">
    {map(errors, (error, idx) => (<ErrorMsg error={error} key={idx} />))}
  </div>);

InputErrors.defaultProps = {
  errors: [],
};

InputErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default enhance(InputErrors);
