import React from 'react'
import { withFormik, Field } from 'formik'
import { Header, Button, Container, Divider, Form, Grid ,Icon, Responsive, Segment, Tab} from 'semantic-ui-react'
import { CheckBox, Input, Select } from './FormField'
import ShipmentFormDetails from './ShipmentFormDetails'



const ShipmentDetailsPanel = (props) => (
  <Segment raised>
    <Header as ='h3'>Shipment Details</Header>
    <Divider />
    <Field
      name='shipmentDetails' 
      render={({field, form }) =>  
        <ShipmentFormDetails {...field} {...form}
          getShipmentDimension={props.getShipmentDimension}
        />
      }
    />
  </Segment>
)

const ShipmentInfoPanel = (props) => {
  return (
    <Tab.Pane attached={false}>
      <Header as='h1'>
        <Icon name='barcode' size='big' />
        <Header.Content>
          <Header.Subheader>
            Shipment Number
          </Header.Subheader>
          {props.values.shipmentId || ''}
        </Header.Content>
      </Header>
      <Form.Group widths={3}>
        <Select
          required name='companyId'
          label='Company:'
          placeholder='Select Company'
          options={props.references.companies}
          width={8}
        />
        <Select
          required
          name='serviceType'
          label='Service Type:'
          placeholder='Select Service Type'
          options={props.references.serviceTypes} 
          width={8}
        />
      </Form.Group>
      <Form.Group widths={3}>
        <Input
          name='shipmentRefNo'
          label='Customer Reference Number:'
          placeholder='Tracking no / Customer Ref No.'
        />
        <Input
          name='custReferenceNo'
          label='Additional Reference (optional):'
          placeholder='Order No, etc..'
        />
      </Form.Group>
      <Input
        name='description'
        label='Description:'
        placeholder='Shipment Description'
        computer={12}
        tablet={16}
      />
      <Input
        name='specialInstructions'
        label='Special Instructions:'
        placeholder='Special Instructions (e.g handling..)'
        computer={12}
        tablet={16}
      />
    </Tab.Pane>
  )
}

const CollectionAddressPanel = (props) => (
  <Tab.Pane attached={false}>
    <CheckBox name='useCompanyAddress' label='Use Company Address' />
    <Input
      required={!props.values.useCompanyAddress}
      name='collectCompanyName'
      label='Company Name:'
      placeholder='Company Name'
      disabled={props.values.useCompanyAddress}
      width={10}
    />
    <Form.Group widths='equal'>
      <Input
        required={!props.values.useCompanyAddress}
        name='collectContactPerson'
        label='Contact Person:'
        placeholder='Contact Person'
        disabled={props.values.useCompanyAddress}
        width={10}
      />
      <Input
        name='collectPhoneNumber'
        label='Phone Number:'
        placeholder='Phone/Mobile Number'
        disabled={props.values.useCompanyAddress}
        width={4} />
      <Input
        name='collectEmail'
        label='Email:'
        placeholder='Email Address'
        disabled={props.values.useCompanyAddress}
        width={4}
      />
    </Form.Group>
    <Input
      required={!props.values.useCompanyAddress}
      name='collectAddress1'
      label='Email:'
      placeholder='Address Line 1'
      disabled={props.values.useCompanyAddress}
      width={8}
    />
    <Input 
      required={!props.values.useCompanyAddress}
      name='collectAddress2'
      placeholder='Address Line 2'
      disabled={props.values.useCompanyAddress}
      width={10}
    />
    <Form.Group widths='equal'>
      <Input 
        required={!props.values.useCompanyAddress}
        name='collectSuburb'
        label='Suburb:'
        placeholder='Suburb'
        disabled={props.values.useCompanyAddress}
      />
      <Input
        required={!props.values.useCompanyAddress}
        name='collectPostCode'
        label='Post Code:'
        placeholder='Post Code'
        disabled={props.values.useCompanyAddress}
      />
      <Input 
        required={!props.values.useCompanyAddress}
        name='collectState'
        label='State:'
        placeholder='State'
        disabled={props.values.useCompanyAddress} 
      />
    </Form.Group>
  </Tab.Pane>
)

const DeliveryAddressPanel = (props) => (
  <Tab.Pane attached={false}>
    <Input
      required
      name='deliveryCompanyName'
      label='Company Name:'
      placeholder='Company Name'
      width={10}
    />
    <Form.Group widths='equal'>
      <Input
        required
        name='deliveryContactPerson'
        label='Contact Person:'
        placeholder='Contact Person'
        width={10}
      />
      <Input
        name='deliveryPhoneNumber'
        label='Phone Number:'
        placeholder='Phone/Mobile Number'
        width={4}
      />
      <Input
        name='deliveryEmail'
        label='Email:'
        placeholder='Email Address'
        width={4}
      />
    </Form.Group>
    <Input required name='deliveryAddress1' label='Email:' placeholder='Address Line 1' width={8} />
    <Input required name='deliveryAddress2' placeholder='Address Line 2' width={10} />
    <Form.Group widths='equal'>
      <Input
        required
        name='deliverySuburb'
        label='Suburb:'
        placeholder='Suburb'
      />
      <Input
        required
        name='deliveryPostCode'
        label='Post Code:'
        placeholder='Post Code'
      />
      <Input
        required
        name='deliveryState'
        label='State:'
        placeholder='State'
      />
    </Form.Group>
  </Tab.Pane>
)

const panes = [
 { menuItem: 'Shipment Info', render: (props) => <ShipmentInfoPanel {...props} />},
 { menuItem: 'Collect Address', render: (props) => <CollectionAddressPanel {...props} />},
 { menuItem: 'Delivery Address', render: (props) => <DeliveryAddressPanel {...props} />}
]

const ShipmentForm = (props) => {
  return (
    <div>
      <Form onSubmit={(e) => { props.handleSubmit() }}>
        <Grid>
          <Grid.Column computer={16} largeScreen={10} widescreen={10}>
          <Segment.Group raised>
            <Segment>
              <Tab
                defaultActiveIndex={0}
                menu={{ secondary: true, pointing: true, color: 'orange', widths: 3 }}
                panes={panes}
                references={props.references}
                values={props.values}
                error={props.error}
                touched={props.touched}
                actions={{
                  handleChange: (e,{name, value}) => { props.setValues(name,value)}
                }}
              >
              </Tab>
            </Segment>
            <Segment textAlign='right'>
              <Button.Group>
                <Button type='button' onClick={(e) => { props.handleCancel() }}>Cancel</Button>
                <Button.Or />
                <Button color='orange'>Save</Button>
              </Button.Group>
            </Segment>
          </Segment.Group>
          </Grid.Column>
          <Responsive
            as={Grid.Column}
            minWidth={Responsive.onlyLargeScreen.minWidth}
            width={6}
          >
            <ShipmentDetailsPanel getShipmentDimension={props.getShipmentDimension}/>
          </Responsive>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  )
}

export default withFormik({
  displayName: 'ShipmentForm',
  mapPropsToValues: (props) => {
    const { data, references } = props
    return {
      companyId: references.companies.length > 0 ? references.companies[0].value : '' ,
      serviceType: '',
      shipmentId: data.shipmentId || '',
      shipmentRefNo: data.shipmentRefNo || '',
      custReferenceNo: data.custRefNo || '',
      description: data.description || '',
      useCompanyAddress: data.useCompanyAddress || true,
      specialInstructions: data.specialInstructions || '',
      collectCompanyName: data.collectCompanyName || '',
      collectContactName: data.collectContactName || '',
      collectPhoneNumber: data.collectPhoneNumber || '',
      collectEmail: data.collectEmail || '',
      collectAddress1: data.collectAddress1 || '',
      collectAddress2: data.collectAddress2 || '',
      collectSuburb: data.collectSuburb || '',
      collectPostCode: data.collectPostCode || '',
      collectState: data.collectState || '',
      deliveryCompanyName: data.deliveryCompanyName || '',
      deliveryContactName: data.deliveryContactName || '',
      deliveryPhoneNumber: data.deliveryPhoneNumber || '',
      deliveryEmail: data.deliveryEmail || '',
      deliveryAddress1: data.deliveryAddress1 || '',
      deliveryAddress2: data.deliveryAddress2 || '',
      deliverySuburb: data.deliverySuburb || '',
      deliveryPostCode: data.deliveryPostCode || '',
      deliveryState: data.deliveryState || '',
      shipmentDetails: [{
        weight: 2.2,
        width: 5,
        height: 5,
        length: 5
      },{
        weight: 1.2,
        width: 5,
        height: 5,
        length: 5
      }]
    }
  },
  handleSubmit: (values) => {
        console.log('For Submitted')
      }
}
)(ShipmentForm)