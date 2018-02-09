import React from 'react'
import { has, omit } from 'lodash'
import { compose, mapProps, onlyUpdateForKeys, setDisplayName,  withHandlers} from 'recompose'
import { Form } from 'semantic-ui-react'
import { Field } from 'formik';
import { enchanceFormikField } from '../../utils/utils'

export default compose(
  enchanceFormikField,
  mapProps((props) => ({ 
    ...props, 
    value: props.field.value,
    error: has(props.form.errors, props.name) && has(props.form.touched, props.name) ,
    label: <label color='red'>{props.label}
            {
              has(props.form.touched, props.name) &&
              has(props.form.errors, props.name) &&
              <label style={{color: 'red', marginLeft: '0.5em'}}>*{props.form.errors[props.name]}</label>
            }
          </label>
  })),
  withHandlers({
    onBlur: ({ name, form: { setFieldTouched }}) => (e) => { setFieldTouched(name, true) },
    onChange: ({ name, form: { setFieldValue } }) => (e, { value }) => { setFieldValue(name, value) },
  }),
  onlyUpdateForKeys(['error', 'value']),
  mapProps((props) => {
    return omit(props, ['form', 'field', 'name'])
  }),
  setDisplayName('FormInput'),
)(Form.Input);