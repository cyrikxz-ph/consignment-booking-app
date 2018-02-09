import React from 'react'
import _ from 'lodash'
import { Divider, Form, Tab, Header } from 'semantic-ui-react'
import { Field } from 'formik'
import { FormCheckBox, FormInput, FormLabeledInput, SuburbPCodeStateFormSelect } from '../../../FormControl'
// import { CheckBox, Input, Select } from '../../../FormField'

const SenderReturnAddressPane = ({
  values,
  errors,
  touched,
  onChange,
  onBlur
}) => (
  <Tab.Pane attached={false}>
    <Header
      as='h4'
    >
      Default Sender Address
      <Divider fitted />
    </Header>
    <FormCheckBox
      name='senderAddressUseCompanyAddr'
      label='Use Company Address'
      size='tiny'
    />
    <Form.Group widths={3}>
      <FormInput
        disabled={values.senderAddressUseCompanyAddr}
        label='Contact Person:'
        name='senderAddressContactPerson'
        placeholder='Contact / Resource Person'
        size='small'
      />
      <FormInput
        disabled={values.senderAddressUseCompanyAddr}
        label='Email:'
        name='senderAddressEmail'
        placeholder='Email'
        size='small'
      />
      <FormLabeledInput
        preInputLabel='+'
        disabled={values.senderAddressUseCompanyAddr}
        label='Phone No:'
        name='senderAddressPhone'
        placeholder='Phone / Mobile Number'
        size='small'
      />
    </Form.Group>
    <Form.Group widths={2}>
      <FormInput
        disabled={values.senderAddressUseCompanyAddr}
        label='Address Line 1:'
        name='senderAddressAddrLine1'
        placeholder='Address Line 1'
        size='small'
      />
      <FormInput
        disabled={values.senderAddressUseCompanyAddr}
        label='Address Line 2:'
        name='senderAddressAddrLine2'
        placeholder='Address Line 2'
        size='small'
      />
    </Form.Group>
    <Field
      disabled={values.senderAddressUseCompanyAddr}
      name='senderAddressSuburb'
      names={{suburb: 'senderAddressSuburb', postCode: 'senderAddressPostCode', state: 'senderAddressState'}}
      component={SuburbPCodeStateFormSelect}
    />
    <Header
      as='h4'
    >
      Default Return Address
      <Divider fitted />
    </Header>
    <FormCheckBox
      name='returnAddressUseCourier'
      label='Use Courier Address'
      size='tiny'
    />
    <Form.Group widths={3}>
      <FormInput
        disabled={values.returnAddressUseCourier}
        label='Contact Person:'
        name='returnAddressContactPerson'
        placeholder='Contact / Resource Person'
        size='small'
      />
      <FormInput
        disabled={values.returnAddressUseCourier}
        label='Email:'
        name='returnAddressEmail'
        placeholder='Email'
        size='small'
      />
      <FormLabeledInput
        preInputLabel='+'
        disabled={values.returnAddressUseCourier}
        label='Phone No:'
        name='returnAddressPhone'
        placeholder='Phone / Mobile Number'
        size='small'
      />
    </Form.Group>
    <Form.Group widths={2}>
      <FormInput
        disabled={values.returnAddressUseCourier}
        label='Address Line 1:'
        name='returnAddressAddrLine1'
        placeholder='Address Line 1'
        size='small'
      />
      <FormInput
        disabled={values.returnAddressUseCourier}
        label='Address Line 2:'
        name='returnAddressAddrLine2'
        placeholder='Address Line 2'
        size='small'
      />
    </Form.Group>
    <Field
      disabled={values.returnAddressUseCourier}
      name='senderAddressSuburb'
      names={{suburb: 'returnAddressSuburb', postCode: 'returnAddressPostCode', state: 'returnAddressState'}}
      component={SuburbPCodeStateFormSelect}
    />
  </Tab.Pane>
)
export default SenderReturnAddressPane;