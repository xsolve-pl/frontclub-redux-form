import React from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import Button from 'material-ui/Button';

import { loadInitialAccount } from '../../modules/appActions'

import Input from '../../components/Input'
import InputCheckbox from '../../components/InputCheckbox'

const InitialValues = (props) => {
  const { handleSubmit, dirty, reset, submitting } = props;

  const sendDataToApi = (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(formData)
        props.loadInitialAccount(formData)
        resolve();
      }, 1000);
    })
  };

  const upper = value => value && value.toUpperCase()

  const isAbove25 = (value, prevVal, allValues) => {
    if (value > 24) {
      props.change('isOld', true)

      return value
    }

    props.change('isOld', false)
    return value
  }

  const data = {
    firstName: 'Michal',
    email: 'michal.ciesliczka@xsolve.pl',
    age: 24,
    isOld: false,
  }

  return (
    <div>
      <h2>Initial Values</h2>
      <form onSubmit={handleSubmit(sendDataToApi)}>
        <Button
          raised
          type="button"
          onClick={() => props.loadInitialAccount(data)}
        >
          Load initial values
      </Button>
        <Field
          name="firstName"
          component={Input}
          label="First Name"
        />
        <Field
          name="email"
          component={Input}
          type="email"
          label="Email"
        />
        <Field
          name="age"
          component={Input}
          type="number"
          label="Age"
          normalize={isAbove25}
        />
        <Field
          name="isOld"
          component={InputCheckbox}
          type="checkbox"
          label="Are you old?"
        />
        <Field
          name="shout"
          component={Input}
          type="text"
          label="Shout somthing"
          normalize={upper}
        />
        <Button
          onClick={reset}
          type="button"
          disabled={!dirty || submitting}
        >
          Reset form
        </Button>
        <Button
          raised
          color="primary"
          type="submit"
          disabled={!dirty || submitting}
        >
          Submit form
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  initialValues: state.app.account,
});

const mapDispatchToProps = {
  loadInitialAccount,
};

const InitialValuesForm = reduxForm({
  form: 'initial-values',
  enableReinitialize: true,
})(InitialValues);

export default connect(mapStateToProps, mapDispatchToProps)(InitialValuesForm)