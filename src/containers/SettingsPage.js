import React, { Component } from 'react'
import { compose, defaultProps, withHandlers, withState, pure, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { Divider, Grid, Header, Menu, Segment } from 'semantic-ui-react'
import SettingsRouter from '../routers/SettingsRouter'
import ShipmentForm from '../components/ShipmentForm'

const settingsMenu = [
  {
    name: 'companies',
    text: 'Companies',
    path: '/settings/companies',
  },{
    name: 'deliverySchemes',
    text: 'Delivery Scheme',
    path: '/settings/deliverySchemes',
  },{
    name: 'lodgementFacilities',
    text: 'Lodgement Facilities',
    path: '/settings/lodgementFacilities',
  },{
    name: 'packageTypes',
    text: 'Package Types',
    path: '/settings/packageTypes',
  },{
    name: 'serviceTypes',
    text: 'Service Types',
    path: '/settings/serviceTypes',
  },{
    name: 'suburbs',
    text: 'Suburbs, PostCodes & States',
    path: '/settings/suburbs',
  },{
    name: 'couriers',
    text: 'Third Party Couriers',
    path: '/settings/couriers',
  },{
    name: 'users',
    text: 'Users',
    path: '/settings/users',
  }
]

const SettingsPage = ({ menus, theme, activeMenu, onMenuChange }) => {
  return (
    <Segment
      style={{padding: '2em'}}
    >
      <Grid columns={2}>
        <Grid.Row only='mobile'>
          Menu for Mobile
        </Grid.Row>
        <Grid.Row>
          <Grid.Column only='computer' largeScreen={3} computer={4}>
            <Menu vertical secondary fluid>
              <Menu.Item header><Header as='h2' content='Settings'/></Menu.Item>
              { menus.map((menu) => {
                  return <Menu.Item
                            key={menu.name}
                            name={menu.name}
                            content={menu.text}
                            active={menu.name === activeMenu}
                            onClick={onMenuChange}
                          />
                })
              }
            </Menu>
          </Grid.Column>
          <Grid.Column stretched largeScreen={13} computer={12} tablet={16}>
            <SettingsRouter />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
export default compose(
  connect(({ theme }) => ({ theme })),
  pure,
  defaultProps({ menus: settingsMenu}),
  withState('activeMenu',
    'setActiveMenu',
    ({ location: { pathname } }) => {
      console.log(pathname.split('/')[2] ? pathname.split('/')[2] : '')
    return pathname.split('/')[2] ? pathname.split('/')[2] : ''    
  }),
  withHandlers({
    onMenuChange: ({ menus, setActiveMenu, location, history }) => (e, { name }) => {
      setActiveMenu(name)
      history.push(`/settings/${name}`)
    }
  }),
  lifecycle({
    componentDidMount() {
      const { menus, activeMenu, setActiveMenu, location, history } = this.props
      if (activeMenu === '') {
        setActiveMenu(menus[0].name)
        history.push(`/settings/${menus[0].name}`)
      }
    }
  }),
)(SettingsPage);