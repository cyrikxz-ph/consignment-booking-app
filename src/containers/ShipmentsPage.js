import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Input, Menu, Segment } from 'semantic-ui-react'
import DataTable from '../components/DataTable'

class ShipmentsPage extends Component {
  constructor(props){
    super(props)
    this.state = { 
      headers: [
        {name: 'shipmentId'},
        {name: 'from'},
        {name: 'to'},
        {name: 'status'}
      ],
      shipments: [{
        shipmentId: 1,
        from: 'Prokopyo Buktot',
        to: 'Aleson Llanes',
        status: 'draft'
      },{
        shipmentId: 2,
        from: 'Prokopyo Buktot',
        to: 'Sam Luel',
        status: 'submitted'
      },{
        selected: false,
        shipmentId: 3,
        from: 'Prokopyo Buktot',
        to: 'Jonalinne Grace Opaco',
        status: 'submitted'
      }],
      ui: {
        activeMenu: 'all',
        filterToggle: false,
        selectedAll: false,
        theme: this.props.theme
      }
    }
  }
  onAddShipments = () => {
    this.props.history.push('/shipments/new')
  }
  onEditShipments = (id) => {
    this.props.history.push(`/shipments/${id}`)
  }
  handleItemClick = (e, { name }) => this.setState({ activeMenu: name })
  render() {
    const { activeMenu, filterToggle, selectedAll, theme } = this.state.ui
    return (
      <div>
        <Segment>
            <Menu secondary stackable color={theme.color}>
            <Menu.Item name='all' active={activeMenu === 'all'} onClick={this.handleItemClick}  />
              <Menu.Item name='draft' active={activeMenu === 'draft'} onClick={this.handleItemClick} />
              <Menu.Item name='submitted' active={activeMenu === 'submitted'} onClick={this.handleItemClick} />
              <Menu.Item name='await pickup' active={activeMenu === 'await pickup'} onClick={this.handleItemClick} />
              <Menu.Item name='inroute' active={activeMenu === 'inroute'} onClick={this.handleItemClick} />
              <Menu.Item name='delivered' active={activeMenu === 'delivered'} onClick={this.handleItemClick} />
              <Menu.Menu position='right'>
                <Menu.Item fitted >
                </Menu.Item>
                <Menu.Item fitted >
                  <Button
                    basic
                    color={theme.color}
                    icon='caret right'
                  />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
        </Segment>
        <Segment>
          <DataTable
            headers={this.state.headers}
            dataKey='shipmentId'
            data={this.state.shipments}
            onAddItem={this.onAddShipments}
            onEditItem={this.onEditShipments}
          />
        </Segment>
      </div>
    )
  }
}


const mapStateToProps = ({ theme }) => (
  {
    theme,
  }
)
// const mapDispatchToProps = (dispatch) => ({
//   handleUserAuth: (email, password) => dispatch(setUserAuth({email, password}))
// })
export default connect(mapStateToProps)(ShipmentsPage)