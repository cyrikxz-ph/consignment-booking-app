import React, { Component } from 'react'
import { Field } from 'formik'
import { Form } from 'semantic-ui-react'

export const Input = (props) => (
  <Field name={props.name} render={
    ({field, form }) => {
      return <Form.Input {...props} {...field} error={!!form.errors[props.name]}/>
    }
  }/>
)

export const Select = (props) => (
  <Field name={props.name} render={({ field, form }) =>
    <Form.Select
        onChange={(e, {name, value}) => { form.setFieldValue(name, value) }}
        onBlur={(e, {name, value}) => { form.setFieldTouched(name) }}
        value={field.value}
        options={props.options}
        {...props}
      />
  }/>
)

export const CheckBox = (props) => (
  <Field name={props.name} render={({ field, form }) =>
    <Form.Checkbox
      checked={field.value}
      onClick={(e, {name, checked}) => { form.setFieldValue(name, checked) }}
      onBlur={(e) => { form.setFieldTouched(e.target.name) }}
      {...props}
    />
  }/>
)