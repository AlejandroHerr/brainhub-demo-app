import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import ErrorMsg from '../../src/client/component/ErrorMsg';

test('+ component > ErrorMsg', (t) => {
  const props = {
    error: 'something went wrong',
  };
  const wrapper = shallow(<ErrorMsg {...props} />);

  const errors = wrapper.find('p');

  t.ok(errors.exists(), 'Should render p component');
  t.equal(error.prop('children'), props.error, 'ErrorMsg has right message');

  t.end();
});
