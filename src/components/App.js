import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, pure, onlyUpdateForKeys , lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { sessionService } from 'redux-react-session';
import AppContainer from './AppContainer'
import LoginPage from '../containers/LoginPage'
import Layout from './Layout'
import PrivateRoute from '../routers/PrivateRoute'


const App = ({ authenticated, checked }) => {
  return (
    <BrowserRouter>
    { checked &&
      <AppContainer>
        <Route path='/' component={Layout} />
      </AppContainer>
    }
    </BrowserRouter>
  )
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired
};

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});
export default connect(mapStateToProps)(App);