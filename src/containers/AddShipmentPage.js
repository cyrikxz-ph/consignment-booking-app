import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Header, Segment } from 'semantic-ui-react'
import ShipmentForm from '../components/ShipmentForm'

class AddShipmentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      references: {
        companies: [
          { key: '1', text: 'MondoConnx Lte. Ptd', value: '222222'},
          { key: '2', text: 'MondoConnx Ptd', value: '11111'}
        ],
        serviceTypes: [
          { key: '1', text: 'MondoConnx EParcel', value: '1'},
          { key: '2', text: 'Australia Post EParcel', value: '2'}
        ]
      },
      shipment: {
        shipmentId: 'ZXY12345600',
        shipmentRefNo: '111111111'
      }
    }
  }
  getShipmentDimension = (weight) => {
    if (weight <=5 && weight >= 1){
      return {
        weight,
        height: 5.0,
        width: 5.0,
        length: 5.0
      }
    } else {
      return { weight }
    }
  }
  onCancel = () => {this.props.history.push('/shipments')}

  render() {
    return (
      <Segment >
        <Header as='h2' >
          New Shipment
        </Header>
        <Divider />
        <ShipmentForm
          getShipmentDimension={this.getShipmentDimension}
          handleCancel={() => this.onCancel()}
          references={this.state.references}
          data={this.state.shipment}
        />
      </Segment>
    )
  }
}

export default AddShipmentsPage