import React, { Component } from 'react'
import { Button, Form, Segment, Table } from 'semantic-ui-react'

const ShipmentFormDetailsTableRow = (props) => (
  <Table.Row>
    <Table.Cell>{props.weight ? `${props.weight} Kg` : '-'}</Table.Cell>
    <Table.Cell>{props.width ? `${props.width} cm` : '-'}</Table.Cell>
    <Table.Cell>{props.height ? `${props.height} cm` : '-'}</Table.Cell>
    <Table.Cell>{props.length ? `${props.length} cm` : '-'}</Table.Cell>
    <Table.Cell collapsing>
      <Button
        basic
        icon='delete'
        onClick={props.onRemove}/>
    </Table.Cell>
  </Table.Row>
)

class ShipmentFormDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '',
      width: '',
      height: '',
      length: '',
      items: this.props.values.shipmentDetails || [],
      errors: {
        weight: false,
        width: false,
        height: false,
        length: false
      }
    }
  }
  onWeightChange = (weight) => {
    if (!weight || weight.match(/^\d{1,}(\.\d{0,3})?$/)) {
      this.setState(() => ({ weight: parseFloat(weight) }))
    }
  }
  onWidthChange = (width) => {
    if (!width || width.match(/^\d{1,}(\.\d{0,3})?$/)) {
      this.setState(() => ({ width: parseFloat(width) }))
    }
  }
  onHeightChange = (height) => {
    if (!height || height.match(/^\d{1,}(\.\d{0,3})?$/)) {
      this.setState(() => ({ height: parseFloat(height) }))
    }
  }
  onLengthChange = (length) => {
    if (!length || length.match(/^\d{1,}(\.\d{0,3})?$/)) {
      this.setState(() => ({ length: parseFloat(length) }))
    }
  }
  onRemoveItem = (index) => { 
    this.setState((prevState) => {
      const items = prevState.items.filter((articel, i) => i !== index );
      this.props.setFieldValue(this.props.name, items)
      return { items };
    })
  }
  handleArticleAdd = (e) => {
    e.preventDefault()
    this.setState((prevState) => {
      console.log(this.props.getShipmentDimension(prevState.weight));
      const {
        weight = prevState.weight,
        width =  prevState.width,
        height = prevState.height,
        length = prevState.length
      } = this.props.getShipmentDimension(prevState.weight);

      if (!!weight && !!width && !!height && !!length) {
        const items = prevState.items.concat({ weight, width, height, length })
        this.props.setFieldValue(this.props.name, items)

        return {
          weight: '',
          width: '',
          height: '',
          length: '',
          items,
          errors: {
            weight: false,
            width: false,
            height: false,
            length: false,
          }
        }
      } else {
        return {
          errors: {
            weight: !weight,
            width: !width,
            height: !height,
            length: !length,
          }
        }
      }
    })
  }

  render() {
    const {height, length, weight, width, errors } = this.state
    return (
      <div>
        <Segment>
          <Form.Group widths={3}>
            <Form.Input
              error={errors.weight}
              value={weight}
              label='Weight (Kg)'
              placeholder='Kg'
              onChange={(e , {value}) => { this.onWeightChange(value) }}
            />
            <Form.Input
              error={errors.width}
              value={width}
              label='Width (cm)'
              placeholder='cm'
              onChange={(e , {value}) => { this.onWidthChange(value) }}
            />
            <Form.Input
              error={errors.height}
              value={height}
              label='Height (cm)'
              placeholder='cm'
              onChange={(e , {value}) => { this.onHeightChange(value) }}
            />
            <Form.Input
              error={errors.length}
              value={length}
              label='Length (cm)'
              placeholder='cm'
              onChange={(e , {value}) => { this.onLengthChange(value) }}
            />
            <Button
              compact
              content='Add'
              onClick={this.handleArticleAdd}
              color='orange'
            />
          </Form.Group>
        </Segment>
        <Segment>
          <Table basic='very' celled textAlign='center'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell content='Weight' />
                <Table.HeaderCell content='Width' />
                <Table.HeaderCell content='Height' />
                <Table.HeaderCell content='Length' />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.items.map((article, index) => 
                <ShipmentFormDetailsTableRow
                  key={index}
                  onRemove={(e) => {
                    e.preventDefault();
                    this.onRemoveItem(index)
                  }}
                  {...article} 
                />
              )}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}

export default ShipmentFormDetails