import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const baseClasses = ['h4', 'label'];
const classnames = (touched, valid) => classNames(baseClasses, {
  'label--invalid': touched && !valid,
  'label--valid': touched && valid,
});

const Label = ({ displayName, name, touched, valid }) => (
  <div className="border-box sm-col col-12 mx-auto my1 pl1">
    <label className={classnames(touched, valid)} htmlFor={name}>{displayName}</label>
  </div>);

Label.propTypes = {
  displayName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default Label;
