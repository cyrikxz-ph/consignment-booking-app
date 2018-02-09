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
    checked: props.field.value,
    error: has(props.form.errors, props.name)
  })),
  withHandlers({
    onBlur: ({ name, form: { setFieldTouched }}) => (e) => { setFieldTouched(name, true) },
    onChange: ({ name, form: { setFieldValue } }) => (e, { checked }) => { setFieldValue(name, checked) },
  }),
  onlyUpdateForKeys(['error', 'checked']),
  mapProps((props) => {
    return omit(props, ['form', 'field', 'name', 'value'])
  }),
  setDisplayName('FormInput'),
)(Form.Checkbox);