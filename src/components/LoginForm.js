
import React, { Component } from 'react'
import { withFormik, Field } from 'formik'
import Yup from 'yup'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Input } from '../components/FormField'
import { FormInput } from '../components/FormControl'

const LoginForm = ({ color, isSubmitting, handleSubmit }) => (
    <Grid centered columns={3} style={{ verticalAlign: 'center'}}> 
      <Grid.Column>
      <Segment style={{margin: '0 auto'}}>
        <Header as='h2' color={color} className='login__header' >
          {/*<Image src='/logo.png' />
          {' '}Log-in to your account*/}
          SIGNIN
        </Header>
        <Form
          loading={isSubmitting}
          onSubmit={handleSubmit}
        >
          <FormInput
            focus
            label='Username:'
            name='email'
            icon='user'
            iconPosition='left'
            placeholder='E-mail Address'
          />
          <FormInput
            label='Password:'
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Button fluid color={color} content='Login' />
        </Form>
        </Segment>
      </Grid.Column>
    </Grid>
)

export default withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: (props) => {
    return {
      email: 'cyrikxz.ph@gmail.com',
      password: 'password123'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be 9 characters or longer')
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    setTimeout(() => {
      props.onLogin(values.email, values.password)
        .catch((e) => {
          setSubmitting(false);
          setErrors({ email: 'Error', password: 'Error'})
          console.log('handleUserAuth', e);
        })
    }, 1000);
  }
})(LoginForm)