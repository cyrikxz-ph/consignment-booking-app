import React from 'react'
import { Container, Message, Portal, Responsive, Segment } from 'semantic-ui-react'
import Footer from './Footer'
import Notification from './Notification'

const AppContainer = (props) => (
  <Responsive
    as='div'
    className='app-container'
  >
    <Notification />
    {props.children}
    <footer>
      <Footer />
    </footer>
  </Responsive>
)

export default AppContainer;