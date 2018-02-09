import React from 'react'
import { Form, Icon, Tab } from 'semantic-ui-react'
import { Field } from 'formik'
import {  FormCheckBox, FormInput, FormLabeledInput, SuburbPCodeStateFormSelect  } from '../../../FormControl'

const GeneralInfoPane = ({
  }) => (
  <Tab.Pane attached={false}>
    <Form.Group widths={2}>  
    <FormInput
      name='name'
      label='Company Name:'
      placeholder='Company Name'
    />
    </Form.Group>
    <Form.Group widths={3}>
      <FormInput
        name='contactPerson'
        label='Contact Person:'
        placeholder='Contact / Resource Person'
      />
    </Form.Group>
    <Form.Group widths={3}>
    <FormInput
        name='email'
        label='Email:'
        placeholder='Email Address'
      />
      <FormLabeledInput
        preInputLabel='+'
        name='phone'
        label='Phone'
        placeholder='Phone / Mobile Number'
      />
    </Form.Group>
    <Form.Group widths={2}>
      <FormInput
        name='addressLine1'
        label='Addresss'
        placeholder='Address Line 1'
      />
    </Form.Group>
    <Form.Group widths={3}>
      <FormInput
        name='addressLine2'
        placeholder='Address Line 2'
      />
      <FormInput
      name='addressLine3'
      placeholder='Address Line 3'
    />
    </Form.Group>
    <Field name='suburb' names={{suburb: 'suburb', postCode: 'postCode', state: 'state'}} component={SuburbPCodeStateFormSelect} />
    <Form.Group widths={3} inline>
      <label> Active: </label>
      <FormCheckBox
        name='active'
        toggle={true}
      />
    </Form.Group>
  </Tab.Pane>
)
export default GeneralInfoPane;