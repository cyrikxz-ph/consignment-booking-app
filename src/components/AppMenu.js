import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Container, Dropdown, Menu , Image } from 'semantic-ui-react'

const menuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const AppMenu = ({ color, activeMenu, onLogout, name }) => (
  <div>
    <Menu
      borderless
      stackable
      fixed='top'
      color={color}
      style={menuStyle}    
    >
      <Container fluid>
        <Menu.Item
          header
          >
        { /* <Image
            size='mini'
            src='/logo.png'
            style={{ marginRight: '1.5em' }}
        />*/}
          ConsegnaMe
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to="/"
          active={activeMenu === 'all'}
          exact={true}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item 
          as={NavLink} 
          to="/shipments" 
          active={activeMenu === 'shipments'}
        >
          Shipments
        </Menu.Item>
        <Menu.Item 
          as={NavLink} 
          to="/settings" 
          active={activeMenu === 'settings'}
        >
          Settings
        </Menu.Item>
        <Menu.Menu position='right'>
          <Dropdown text={name} pointing className='link item' labeled>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className='user icon' />
                <span className='text'>Account</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className='credit card icon' />
                <span className='text'>Billing</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className='settings icon' />
                <span className='text'>Settings</span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => { onLogout() }}
              >
                <i className='shutdown icon' />
                <span className='text'>Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
)
export default AppMenu