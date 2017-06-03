import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import map from 'lodash/map';
import { initForm, updateField, submitFormThunk } from './../actions';
import Field from '../component/Field';
import SubmitButton from '../component/SubmitButton';
import { selectFields, selectIsValid } from '../reducers/form';
import formOptions from '../../common/form';
import '../styles/form.css';

class Form extends PureComponent {
  componentWillMount() {
    const { actions: { onInit }, formFields } = this.props;
    onInit(map(formFields, 'name'));
  }
  renderFields() {
    const { actions: { onUpdate }, fields, formFields } = this.props;

    return map(formFields, (field) => {
      const { displayName, name, type, validators } = field;
      return (<Field
        displayName={displayName}
        errors={get(fields, `${name}.errors`, [])}
        key={name}
        name={name}
        touched={get(fields, `${name}.touched`, false)}
        type={type}
        valid={get(fields, `${name}.valid`, false)}
        validators={validators}
        value={get(fields, `${name}.value`, '')}
        onUpdate={onUpdate}
      />);
    });
  }

  render() {
    const { actions: { onSubmit } } = this.props;
    const { title, error, isSubmiting, submited, isValid } = this.props;
    return (<div className="border-box clearfix col-12 sm-col-6 border p2 mx-auto">
      <div className="col col-12 center"><h1 className="h2">{title}</h1></div>
      {this.renderFields()}
      <div className="border-box clearfix col-12 sm-col-8 mx-auto my2">
        <SubmitButton
          disabled={!isValid}
          error={error}
          isSubmiting={isSubmiting}
          submited={submited}
          onClick={onSubmit}
        />
      </div>
    </div>);
  }
}
Form.defaultProps = {
  fields: {},
  formFields: [],
  title: 'Form',
};
Form.propTypes = {
  actions: PropTypes.shape({
    onInit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.bool.isRequired,
  fields: PropTypes.object,
  formFields: PropTypes.arrayOf(PropTypes.object),
  isSubmiting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  submited: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const props = (state, ownProps = { form: formOptions }) => ({
  title: ownProps.form.title,
  formFields: ownProps.form.fields,
  fields: selectFields(state),
  error: state.form.error,
  isSubmiting: state.form.isSubmiting,
  submited: state.form.submited,
  isValid: selectIsValid(state),
});

const actions = dispatch => ({
  actions: bindActionCreators({
    onInit: initForm,
    onUpdate: updateField,
    onSubmit: submitFormThunk,
  }, dispatch),
});

export default connect(props, actions, undefined, { pure: true })(Form);
