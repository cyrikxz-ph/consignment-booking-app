import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react'
import { Field } from 'formik';

 const FormLabeledInput = ({
  disabled = false,
  label,
  preInputLabel = '',
  postInputLabel = '',
  name,
  placeholder,
  size,
  required = false,
  }) => (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }) => (
            <Form.Input
              labelPosition='left'
              disabled={disabled}
              placeholder={placeholder}
              error={_.has(touched, field.name) && _.has(errors,field.name)}
              label={<label color='red'>{label}
                    {_.has(touched, field.name) &&
                      _.has(errors,field.name) &&
                      <label style={{color: 'red', marginLeft: '0.5em'}}>*{errors[field.name]}</label>}
                    </label>}
              required={required}
              size={size}
              {...field}
            >
              <Label basic>{preInputLabel}</Label>
              <input />
            </Form.Input>
        )
      }
    />
  
)
FormLabeledInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}
export default FormLabeledInput