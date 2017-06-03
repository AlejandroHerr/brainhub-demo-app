import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'recompose';
import classNames from 'classnames/bind';

const baseClasses = ['input', 'border-box', 'p1'];
const classnames = (touched, valid) => classNames(baseClasses, {
  'input--invalid': touched && !valid,
  'input--valid': touched && valid,
});

export const BaseInput = ({ displayName, name, type, touched, valid, value, onChange }) => (
  <div className="border-box sm-col col-12 mx-auto">
    <input
      className={classnames(touched, valid)}
      name={name}
      placeholder={displayName}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>);

BaseInput.propTypes = {
  displayName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withHandlers({
  onChange: props => event => props.onUpdate(props.name, event.target.value, props.validators),
})(BaseInput);
