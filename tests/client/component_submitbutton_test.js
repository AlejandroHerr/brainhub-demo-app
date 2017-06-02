import React from 'react';
import test from 'tape';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import SubmitButton from '../../src/client/component/SubmitButton';
/*
SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
  submited: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
*/
test('+ component > SubmitButton', ({ test: subtest }) => {
  const onClick = spy();
  const props = {
    disabled: true,
    error: false,
    isSubmiting: false,
    submited: false,
    onClick,
  };
  const submitButton = shallow(<SubmitButton {...props} />);


  subtest('|- Invalid button', (t) => {
    const buttons = submitButton.find('button');
    t.ok(buttons.exists(), 'Should create a button');
    const button = buttons.first();
    t.ok(button.prop('disabled'), 'Should be disabled');
    t.equal(button.prop('children'), 'Save', 'Should render the satus message');
    t.ok(button.hasClass('button'), 'Should have the general class');
    t.ok(button.hasClass('button--normal'), 'Should have the right class');

    t.end();
  });
  subtest('|- Valid button', (t) => {
    submitButton.setProps({ ...props, disabled: false });
    const buttons = submitButton.find('button');
    t.ok(buttons.exists(), 'Should create a button');
    const button = buttons.first();
    t.notOk(button.prop('disabled'));
    t.equal(button.prop('children'), 'Save', 'Should render the satus message');
    t.ok(button.hasClass('button--normal'), 'Should have the right class');
    button.simulate('click');
    t.ok(onClick.calledOnce, 'Should call onClick');

    t.end();
  });
  subtest('|- isSubmiting button', (t) => {
    submitButton.setProps({ ...props, isSubmiting: true });
    const buttons = submitButton.find('button');
    t.ok(buttons.exists(), 'Should create a button');
    const button = buttons.first();
    t.ok(button.prop('disabled'));
    t.equal(button.prop('children'), 'Submiting...', 'Should render the satus message');
    t.ok(button.hasClass('button--submitting'), 'Should have the right class');

    t.end();
  });
  subtest('|- Error button', (t) => {
    submitButton.setProps({ ...props, error: true });
    const buttons = submitButton.find('button');
    t.ok(buttons.exists(), 'Should create a button');
    const button = buttons.first();
    t.ok(button.prop('disabled'));
    t.equal(button.prop('children'), 'Submit Failed', 'Should render the satus message');
    t.ok(button.hasClass('button--error'), 'Should have the right class');

    t.end();
  });
  subtest('`- Submited button', (t) => {
    submitButton.setProps({ ...props, submited: true });
    const buttons = submitButton.find('button');
    t.ok(buttons.exists(), 'Should create a button');
    const button = buttons.first();
    t.ok(button.prop('disabled'));
    t.equal(button.prop('children'), 'Saved', 'Should render the satus message');
    t.ok(button.hasClass('button--submited'), 'Should have the right class');

    t.end();
  });
});
