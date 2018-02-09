import React, { Component } from 'react'
import _ from 'lodash'
import { Button, Divider, Form, Header, Segment, Input } from 'semantic-ui-react'
import { withFormik } from 'formik'
import Yup from 'yup'
import { FormInput, FormSelect } from '../../FormControl'
import { transformApiToFormikErrors } from '../../../utils/utils'


const UserForm =  ({
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
      <Header
        as='h4'
      >
        Login Information
        <Divider fitted />
      </Header>
      <Form.Group widths={3}>
        <FormInput
          name='email'
          label='Email:'
          placeholder='Email'
        />
        <FormInput
          name='password'
          label='Password:'
          placeholder='Password'
          type='password'
          disabled={isEdit}
        />
      </Form.Group>
      <Header
        as='h4'
      >
        User Information
        <Divider fitted />
      </Header>
      <Form.Group widths={3}>
        <FormInput
          name='firstName'
          label='First Name:'
          placeholder='First Name'
        />
        <FormInput
          name='mi'
          label='M.I.'
          placeholder='MI'
          width={2}
        />
      </Form.Group>
      <Form.Group widths={3}>
        <FormInput
          name='lastName'
          label='Last Name:'
          placeholder='Last Name'
        />
      </Form.Group>
      <Form.Group widths={3}>
        <FormSelect
          name='companyId'
          reference='companies'
          label='Company'
          placeholder='Select Company'
          includedoption={[{ key: -1, text: 'None', value: 'NONE'}]}
          search
          selection
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
    const { data: user } = props
    return {
      id: user.id || '',
      email: user.email || '',
      password: user.password || '',
      firstName: user.firstName || '',
      mi: user.mi || '',
      lastName: user.lastName || '',
      companyId: user.companyId || '',
      active: user.active || true
    }
  },
  validationSchema: Yup.object().shape({
    id: Yup.string(),
    email: Yup.string().email().required('email is a required'),
    password: Yup.string()
      .when('id', {
          is: undefined,
          then: Yup.string()
                  .required('password is a field')
                  .min(8,'minimun alphnumeric characters of 8'),
          otherwise: Yup.string()
        }),
    firstName: Yup.string().required('first name is required'),
    mi: Yup.string().max(1),
    lastName: Yup.string().required('last name is required'),
    companyId: Yup.string().required('company is required'),
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
})(UserForm)