import React, { Component } from 'react'
import _ from 'lodash'
import { Button, Divider, Form, Label, Segment, Tab } from 'semantic-ui-react'
import { withFormik } from 'formik'
import Yup from 'yup'
import { FormInput, FormCheckBox, ErrorLabel, Input, FormSelect } from '../../FormControl'
import { transformApiToFormikErrors } from '../../../utils/utils'


const SuburbForm =  ({
  errors,
  handleSubmit,
  isSubmitting,
  onBack,
  setFieldTouched,
  setFieldValue,
  touched,
  values
}) => (
  <Form
    onSubmit={handleSubmit}
    loading={isSubmitting}
  >
    <Segment>
      <Form.Group widths={3}>
        <FormInput
          name='suburb'
          label='Suburb:'
          placeholder='Suburb'
        />
      </Form.Group>
      <Form.Group widths={3}>
        <FormSelect
          name='postCode'
          reference='postCode'
          label='Post Code:'
          placeholder='Select Post Code'
          search
          selection
        />
      </Form.Group>
      <Form.Group widths={3}>
        <FormSelect
          name='state'
          reference='state'
          label='State:'
          placeholder='Select State'
          search
          selection
        />
      </Form.Group>
      <Form.Group widths={3} inline>
        <label> Active: </label>
        <FormCheckBox
          name='active'
          toggle={true}
        />
      </Form.Group>
    </Segment>
    <Divider />
    <Button.Group size='large'>
      <Button type='button' onClick={(e) => { onBack() }}>Back  </Button>
      <Button.Or />
      <Button primary>Save</Button>
    </Button.Group>
  </Form>
)
export default withFormik({
  displayName: 'SuburbForm',
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { data: suburb } = props
    return {
      id: suburb.id || '',
      suburb: suburb.suburb || '',
      postCode: suburb.postCode || '',
      state: suburb.state || '',
      active: suburb.active || true
    }
  },
  validationSchema: Yup.object().shape({
    suburb: Yup.string().required('Suburb is required'),
    postCode: Yup.string().required('Post Code is required'),
    state: Yup.string().required('State is required')
  }),
  handleSubmit: (values, {props, setErrors, setSubmitting}) => {
    // console.log(values)
    setSubmitting(true)
    props.onSubmit(values)
      .then(() => {
        setSubmitting(false)
        props.onBack()
      })
      .catch((errors) => {
        setErrors(transformApiToFormikErrors(error))
        setSubmitting(false)
      })
  },
  validateOnBlur: false,
  validateOnChange: false,
})(SuburbForm)