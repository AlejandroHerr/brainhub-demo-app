import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const statusMessage = (error, isSubmiting, submited) => classNames({
  Save: !error && !isSubmiting && !submited,
  'Submiting...': !error && isSubmiting && !submited,
  'Submit Failed': error && !isSubmiting && !submited,
  Saved: !error && !isSubmiting && submited,
});

const baseClasses = ['border-none', 'not-rounded', 'px2', 'py1', 'button'];
const classnames = (error, isSubmiting, submited) => classNames(baseClasses, {
  'button--normal': !error && !isSubmiting && !submited,
  'button--submitting': !error && isSubmiting && !submited,
  'button--error': error && !isSubmiting && !submited,
  'button--submited': !error && !isSubmiting && submited,
});

const SubmitButton = ({ disabled, error, isSubmiting, submited, onClick }) => (
  <button
    className={classnames(error, isSubmiting, submited)}
    disabled={disabled}
    onClick={onClick}
  >
    {statusMessage(error, isSubmiting, submited)}
  </button>);

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
  submited: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
