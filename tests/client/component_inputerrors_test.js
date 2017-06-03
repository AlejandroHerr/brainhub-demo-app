import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import size from 'lodash/size';
import InputErrors from '../../src/client/component/InputErrors';

test('+ component > InputErrors', ({ test: subtest }) => {
  const props = {
    // errors: ['sad'],
  };
  const wrapper = shallow(<InputErrors {...props} />);

  subtest('|- No errors', (t) => {
    const inputErrors = wrapper.find('InputErrors');
    t.equal(size(inputErrors), 0, 'If there\' no errors should not render anything');

    t.end();
  });
  subtest('`- With errors', (t) => {
    wrapper.setProps({ errors: ['Error1', 'Error2'] });
    const inputErrors = wrapper.find('InputErrors');
    t.equal(size(inputErrors), 1, 'If there\' no errors should not render anything');
    const div = inputErrors.render().children()[0];
    t.ok(div, 'Renders a div');
    t.equal(size(div.children), 2, 'Should render the errors');

    t.end();
  });
});
