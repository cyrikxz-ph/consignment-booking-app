import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Message, Portal, Responsive, TransitionablePortal } from 'semantic-ui-react'
import { hideNotification } from '../actions/notificationAction';

const  Notification = (props) => {
  const getIcon = (status) => {
    switch(status) {
      case 'success':
        return 'checkmark box'
      case 'danger':
        return 'remove circle'
      case 'warning':
        return 'warning sign'
      default:
        return 'info'
    }
  }
  const onDismiss = () => { dispatch()} 
  return (
    <Portal open={props.open}>
      <TransitionablePortal
        open={props.open}
        onClose={props.onDismiss}
        transition={{ 
          animation: 'fade down',
          duration: 400
        }}
      >
        <div className='notification'>
          <Message 
            size='small'
            icon={getIcon(props.type)}
            header={props.header || ''}
            success={props.type === 'success' || false}
            negative={props.type === 'danger' || false}
            warning={props.type === 'warning' || false}
            content={props.message }
            onDismiss={props.onDismiss}
          />
        </div>
        </TransitionablePortal>
    </Portal>
  )
}


const mapStateToProps = (state) => (
  {
    type: state.notification.type || 'info',
    message: state.notification.message || '',
    header: state.notification.header || '',
    open: state.notification.show || false
  }
)
const mapDispatchToProps = (dispatch) => ({
  onDismiss: (email, password) => dispatch(hideNotification())
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification);