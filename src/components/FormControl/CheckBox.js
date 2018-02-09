import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'

 const CheckBox = ({
  error = false,
  label = '',
  onBlur,
  onChange,
  size = 'medium',
  slider = false,
  toggle = false,
  value,
 }) => (
  <Form.Checkbox
    toggle={toggle}
    slider={slider}
    label={label}
    checked={value}
    error={error}
    size={size}
    onClick={(e, {checked}) => { onChange(checked) }}
    onBlur={(e) => { onBlur() }}
  />
)

CheckBox.propTypes = {
  error: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  slider: PropTypes.bool,
  toggle: PropTypes.bool,
}

export default CheckBox