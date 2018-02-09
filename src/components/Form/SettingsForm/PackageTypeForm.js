import React, { Component } from 'react'
import _ from 'lodash'
import { Button, Divider, Form, Header, Segment, Input } from 'semantic-ui-react'
import { withFormik } from 'formik'
import Yup from 'yup'
import { FormInput, FormCheckBox } from '../../FormControl'
import { transformApiToFormikErrors } from '../../../utils/utils'

const PackageTypeForm =  ({
  errors,
  handleSubmit,
  isEdit,
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
      <Form.Group widths={4}>
        <FormInput
          name='code'
          label='Code:'
          placeholder='Package Code'
        />
      </Form.Group>
      <Form.Group widths={2}>
        <FormInput
          name='description'
          label='Description:'
          placeholder='Package Type Description'
        />
      </Form.Group>
      <Form.Group widths={3}>
        <FormInput
          name='weightMin'
          label='Weight Minumum:'
          placeholder='minimum weight of package'
        />
        <FormInput
          name='weightMax'
          label='Weight Maximum:'
          placeholder='maximum weight of package'
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
  displayName: 'UserForm',
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { data: packageType } = props
    return {
      id: packageType.id || '',
      code: packageType.code || '',
      description: packageType.description || '',
      weightMin: packageType.weightMin || 0,
      weightMax: packageType.weightMax || 0,
      active: packageType.active || true
    }
  },
  validationSchema: Yup.object().shape({
    id: Yup.string(),
    code: Yup.string().required('code is a required'),
    description: Yup.string().required('description is a required'),
    weightMin: Yup.number().required('weightMax is required'),
    weightMax: Yup.number().required('weightMax is required'),
    active: Yup.bool(),
  }),
  handleSubmit: (values, {props, setErrors, setSubmitting}) => {
    // console.log(values)
    setSubmitting(true)
    props.onSubmit(values)
      .then(() => {
        setSubmitting(false)
        props.onBack()
      })
      .catch((e) => {
        if (e) {
          setErrors(transformApiToFormikErrors(e))
        }
        setSubmitting(false)
      })
  },
  validateOnBlur: false,
  validateOnChange: false,
})(PackageTypeForm)