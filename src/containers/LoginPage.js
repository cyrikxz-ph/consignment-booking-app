import React, { Component } from 'react'
import { connect,  } from 'react-redux'
import { compose, pure, lifecycle } from 'recompose'
import { Container } from 'semantic-ui-react'
import LoginForm from '../components/LoginForm'
import { login } from '../actions/sessionActions'

const LoginPage = ({authenticated, onLogin, location, theme}) => {
  return (
    <Container style={{ height: '85vh' }} >
      <LoginForm 
        color={theme.color}
        onLogin={onLogin}
      />
    </Container>
  )
}

const mapStateToProps = ({ theme, session: { authenticated }}) => ({
  theme,
  authenticated
})
const mapDispatchToProps = (dispatch, { history, location: { state = { from: '/' } }}) => ({
  onLogin: (email, password) => {
    return dispatch(login({ email, password}))
      .then(() => {
        if (state.from) {
          const redirect = state.from === '/login' ? '/' : state.from
          history.push(redirect)
        }
        return Promise.resolve()
      })
  }
})

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      const { authenticated, history, location: { state = { from: '/' } } } = this.props
      if(authenticated) {
        const redirect = state.from
        history.push(redirect)
      }
    }
  }),
  pure,
)(LoginPage)
  
