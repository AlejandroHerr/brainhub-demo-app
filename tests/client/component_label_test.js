import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import Label from '../../src/client/component/Label';

test('+ component > Label', ({ test: subtest }) => {
  const props = {
    displayName: 'Display Name',
    name: 'useremail',
    touched: false,
    valid: false,
  };
  const wrapper = shallow(<Label {...props} />);

  subtest('|- Normal label', (t) => {
    const labels = wrapper.find('label');
    t.ok(labels.exists(), 'Should render Label component');
    const label = labels.first();
    t.ok(label.hasClass('label'), 'label has default class');
    t.equal(label.prop('children'), 'Display Name', 'label has right for');
    t.equal(label.prop('htmlFor'), 'useremail', 'label has right htmlFor');

    t.end();
  });
  subtest('|- Invalid label', (t) => {
    wrapper.setProps({ ...props, touched: true });
    const labels = wrapper.find('label');
    t.ok(labels.exists(), 'Should render Label component');
    const label = labels.first();
    t.ok(label.hasClass('label'), 'label has default class');
    t.ok(label.hasClass('label--invalid'), 'label has status class');
    t.equal(label.prop('children'), 'Display Name', 'label has right for');
    t.equal(label.prop('htmlFor'), 'useremail', 'label has right htmlFor');

    t.end();
  });
  subtest('`- Valid label', (t) => {
    wrapper.setProps({ ...props, touched: true, valid: true });
    const labels = wrapper.find('label');
    t.ok(labels.exists(), 'Should render Label component');
    const label = labels.first();
    t.ok(label.hasClass('label'), 'label has default class');
    t.ok(label.hasClass('label--valid'), 'label has status class');
    t.equal(label.prop('children'), 'Display Name', 'label has right for');
    t.equal(label.prop('htmlFor'), 'useremail', 'label has right htmlFor');

    t.end();
  });
});
