import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'recompose';
import classNames from 'classnames/bind';

const baseClasses = ['input', 'border-box', 'p1'];
const classnames = (touched, valid) => classNames(baseClasses, {
  'input--invalid': touched && !valid,
  'input--valid': touched && valid,
});

export const Input = ({ displayName, name, type, touched, valid, value, onChange }) => (
  <input
    className={classnames(touched, valid)}
    name={name}
    placeholder={displayName}
    type={type}
    value={value}
    onChange={onChange}
  />);

Input.propTypes = {
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
})(Input);
