import React from 'react'
import PropTypes from 'prop-types';
import { Form, } from 'semantic-ui-react'

 const Input = ({
  disabled = false,
  error = false,
  label,
  onChange,
  onBlur,
  placeholder,
  size,
  required = false,
  value,
  }) => (
  <Form.Input
    required={required}
    label={label}
    placeholder={placeholder}
    value={value}
    error={error}
    size={size}
    disabled={disabled}
    onChange={(e, { value }) => { onChange(value)}}
    onBlur={(e) => { onBlur() }}
  />
)
Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any.isRequired,
}
export default Input