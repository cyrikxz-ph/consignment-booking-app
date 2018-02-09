import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AddShipmentPage from '../containers/AddShipmentPage'
import DashBoardPage from '../containers/DashBoardPage'
import EditShipmentPage from '../containers/EditShipmentPage'
import Layout from '../components/Layout'
import LoginPage from '../containers/LoginPage'
import NotFoundPage from '../containers/NotFoundPage'
import SettingsPage from '../containers/SettingsPage'
import ShipmentsPage from '../containers/ShipmentsPage'

const AppRouter = ({ authenticated }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={DashBoardPage} authenticated={authenticated} />
      <PrivateRoute exact path='/shipments' component={ShipmentsPage} authenticated={authenticated} />
      <PrivateRoute path='/shipments/new' component={AddShipmentPage} authenticated={authenticated} />
      <PrivateRoute path='/shipments/:id' component={EditShipmentPage} authenticated={authenticated} />
      <PrivateRoute path='/settings' component={SettingsPage} authenticated={authenticated} />
      <Route path='/login' component={LoginPage} />
      <Route component={NotFoundPage} authenticated={authenticated} />
    </Switch>
  )
}

export default AppRouter
