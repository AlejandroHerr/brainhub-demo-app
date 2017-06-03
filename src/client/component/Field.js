import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Input from './Input';
import InputErrors from './InputErrors';
import Label from './Label';

const Field = ({
  displayName,
  errors,
  name,
  touched,
  type,
  valid,
  validators,
  value,
  onUpdate }) => (
    <div className="border-box clearfix col-12 sm-col-8 mx-auto my1">
      <Label displayName={displayName} name={name} />
      <Input
        displayName={displayName}
        name={name}
        touched={touched}
        type={type}
        valid={valid}
        validators={validators}
        value={value}
        onUpdate={onUpdate}
      />
      <InputErrors errors={errors} />
    </div>);

Field.defaultProps = {
  errors: [],
  type: 'text',
  validators: [],
  value: '',
};

Field.propTypes = {
  displayName: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  type: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

export default onlyUpdateForKeys(['touched', 'valid', 'value'])(Field);

