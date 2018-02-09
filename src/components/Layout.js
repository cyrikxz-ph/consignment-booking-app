import React, { Component } from 'react'
import { Container, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose, pure, withProps } from 'recompose'
import AppMenu from './AppMenu'
import AppRouter from '../routers/AppRouter'
import TrackParcel from './TrackParcel'
import { getUserInfo, login, logout } from '../actions/sessionActions'
// import { appInit } from '../actions/appActions'

const Layout = ({ authenticated, theme, onLogout, name }) => {
  return (
    <div className='layout-container'>
      {authenticated && <AppMenu {...theme} onLogout={onLogout} name={name} />}
      <Container fluid style={{ marginTop: '4em' }}>
        <Grid>
          <Grid.Column computer={16} largeScreen={16} widescreen={14}>
            <AppRouter authenticated={authenticated} />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ theme, session: { user, authenticated }}) => ({
  theme,
  authenticated,
  user
})
const mapDispatchToProps = (dispatch, { history }) => ({
  getUserName: () => dispatch(getUserInfo()),
  onLogout: () => dispatch(logout(history)),
})
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
  withProps(({ user }) => ({
    name: user ? `${user.firstName} ${user.lastName}` : ''
  })),
)(Layout)
