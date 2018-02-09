import React from 'react'
import _ from 'lodash'
import { Divider, Form, Tab, Header } from 'semantic-ui-react'
import { Field } from 'formik'
import { CheckBox, ErrorLabel, Input } from '../../../FormControl'
import { Select } from '../../../FormField'
import { FormCheckBox, FormInput, FormSelect } from '../../../FormControl'

const SettingsPane = ({
  values,
  errors,
  touched,
  onChange,
  onBlur
}) => (
  <Tab.Pane attached={false}>
    <Form.Group widths={2}>
      <FormSelect
        name='parentId'
        reference='companies'
        label='Parent Company'
        placeholder='Select Parent Company'
        includedoption={[{ key: -1, text: 'None', value: 'NONE'}]}
        search
        selection
      />
    </Form.Group>
    <Form.Group widths={3}>
      <FormCheckBox
        name='allowedManifest'
        label='Allow Self Manifest'
        size='tiny'
        toggle
      />
    </Form.Group>
    <Form.Group widths={3}>
      <Select
        name='serviceTypes'
        label='Service Types:'
        placeholder='Select Allow Service Types'
        options={[{key: 1, text: 'Default ServiceType', value: '123123123'}]}
        multiple
      />
    </Form.Group>
    <Header
      as='h4'
    >
      Notification Settings
      <Divider />
    </Header>
    <Form.Group widths={5}>
      <FormCheckBox
        name='notifyOnCreate'
        label='Created'
        size='tiny'
        toggle
      />
      <FormCheckBox
        name='notifyOnManifest'
        label='Manifested'
        size='tiny'
        toggle
      />
      <FormCheckBox
        name='notifyOnDeliveryRoute'
        label='On Delivery Route'
        size='tiny'
        toggle
      />
      <FormCheckBox
        name='notifyOnDelivered'
        label='Delivered'
        size='tiny'
        toggle
      />
      <FormCheckBox
        name='notifyOnCarded'
        label='Carded'
        size='tiny'
        toggle
      />
    </Form.Group>
    <Header
      as='h4'
    >
      Integrations
      <Divider />
    </Header>
    <Form.Group widths={3}>
      <FormInput
        disabled
        name='apiKey'
        label='Company API Key:'
        placeholder='API Key'
        size='small'
      />
    </Form.Group>
  </Tab.Pane>
)
export default SettingsPane;