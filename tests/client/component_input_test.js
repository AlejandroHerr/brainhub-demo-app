import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import Input from '../../src/client/component/Input';

test('+ component > Input', ({ test: subtest }) => {
  const props = {
    displayName: 'Display Name',
    name: 'useremail',
    type: 'email',
    touched: false,
    value: 'default',
    valid: false,
    validators: ['isRequired'],
  };
  const wrapper = shallow(<Input {...props} />);

  subtest('|- Normal input', (t) => {
    const inputWrapper = wrapper.find('Input');
    t.ok(inputWrapper.exists(), 'Should render Input component');
    const input = inputWrapper.render().find('input');
    t.ok(input, 'Renders input element');
    t.ok(input.hasClass('input'), 'input has default class');
    t.equal(input.attr('placeholder'), 'Display Name', 'input has right placeholder');
    t.equal(input.attr('name'), 'useremail', 'input has right name');
    t.equal(input.attr('value'), 'default', 'input has right value');
    t.equal(input.attr('type'), 'email', 'input has right type');

    t.end();
  });
  subtest('|- Invalid input', (t) => {
    wrapper.setProps({ ...props, touched: true });
    const inputWrapper = wrapper.find('Input');
    t.ok(inputWrapper.exists(), 'Should render Input component');
    const input = inputWrapper.render().find('input');
    t.ok(input, 'Renders input element');
    t.ok(input.hasClass('input'), 'input has default class');
    t.equal(input.attr('placeholder'), 'Display Name', 'input has right placeholder');
    t.equal(input.attr('name'), 'useremail', 'input has right name');
    t.equal(input.attr('value'), 'default', 'input has right value');
    t.equal(input.attr('type'), 'email', 'input has right type');
    t.ok(input.hasClass('input--invalid'), 'input has status class');

    t.end();
  });
  subtest('|- Valid input', (t) => {
    wrapper.setProps({ ...props, touched: true, valid: true });
    const inputWrapper = wrapper.find('Input');
    t.ok(inputWrapper.exists(), 'Should render Input component');
    const input = inputWrapper.render().find('input');
    t.ok(input, 'Renders input element');
    t.ok(input.hasClass('input'), 'input has default class');
    t.equal(input.attr('placeholder'), 'Display Name', 'input has right placeholder');
    t.equal(input.attr('name'), 'useremail', 'input has right name');
    t.equal(input.attr('value'), 'default', 'input has right value');
    t.equal(input.attr('type'), 'email', 'input has right type');
    t.ok(input.hasClass('input--valid'), 'input has status class');

    t.end();
  });
});
