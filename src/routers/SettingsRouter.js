import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SettingsSearchPage from '../containers/SettingsSearchPage'
import SettingsAddEditPage from '../containers/SettingsAddEditPage'
import CompanyForm from '../components/Form/SettingsForm/CompanyForm'
import PackageTypeForm from '../components/Form/SettingsForm/PackageTypeForm'
import SuburbForm from '../components/Form/SettingsForm/SuburbForm'
import UserForm from '../components/Form/SettingsForm/UserForm'
import * as packageTypeActions from '../actions/settings/packageTypeActions'
import * as userActions from '../actions/settings/userActions'
import * as suburbActions from '../actions/settings/suburbActions'
import * as companyActions from '../actions/settings/companyActions'

// import { 
//   Courier,
//   CourierAdd,
//   CourierEdit,
//   DeliveryScheme,
//   DeliverySchemeAdd,
//   DeliverySchemeEdit,
//   LodgementFacility,
//   LodgementFacilityAdd,
//   LodgementFacilityEdit,
//   PostCode,
//   PostCodeAddEdit,
//   ServiceType,
//   ServiceTypeAdd,
//   ServiceTypeEdit,
// } from '../containers/Settings'

const routes = [
  {
    name: 'CompanySearch',
    exact: true,
    path: '/settings/companies',
    component: SettingsSearchPage,
    props: {
      headers: [
        { name: 'name', text: 'Company Name', linkTo: 'companies/:id', linkToId: 'id' },
        { name: 'parentCompanyName', text: 'Parent Company', linkTo: 'companies/:id', linkToId: 'parentId', textAlign: 'center' },
        { name: 'contactPerson', text: 'Contact Person', textAlign: 'center' },
        { name: 'email', text: 'Contact Email', textAlign: 'center', mailTo: true },
        { name: 'phone', text: 'Phone Number', textAlign: 'center' },
        { name: 'active', text: 'Active', textAlign: 'center' },
      ],
      actionCreator: companyActions
    }
  },
  {
    name: 'CompanyAdd',
    exact: false,
    path: '/settings/companies/new',
    component: SettingsAddEditPage,
    props: {
      name: 'Package Type',
      actionCreator: companyActions,
      form: CompanyForm
    }
  },{
    name: 'CompanyEdit',
    exact: false,
    path: '/settings/companies/:id',
    component: SettingsAddEditPage,
    props: {
      name: 'Package Type',
      actionCreator: companyActions,
      form: CompanyForm
    }
  },
  {
    name: 'PackageTypeSearch',
    exact: true,
    path: '/settings/packageTypes',
    component: SettingsSearchPage,
    props: {
      headers: [
        { name: 'description', text: 'Package Description', linkTo: 'packageTypes/:id', linkToId: 'id', textAlign: 'center' },
        { name: 'code', text: 'Package Code', textAlign: 'center'  },
        { name: 'weightMin', text: 'Weight (Min)', textAlign: 'center' },
        { name: 'weightMax', text: 'Weight (Max)', textAlign: 'center' },
        { name: 'active', text: 'Active', textAlign: 'center' },
      ],
      actionCreator: packageTypeActions
    }
  },
  {
    name: 'PackageTypeAdd',
    exact: false,
    path: '/settings/packageTypes/new',
    component: SettingsAddEditPage,
    props: {
      name: 'Package Type',
      actionCreator: packageTypeActions,
      form: PackageTypeForm
    }
  },{
    name: 'PackageTypeEdit',
    exact: false,
    path: '/settings/packageTypes/:id',
    component: SettingsAddEditPage,
    props: {
      name: 'Package Type',
      actionCreator: packageTypeActions,
      form: PackageTypeForm
    }
  },{
    name: 'SuburbSearch',
    exact: true,
    path: '/settings/suburbs',
    component: SettingsSearchPage,
    props: {
      headers: [
        { name: 'name', text: 'Suburb', linkTo: 'postCodes/:id', linkToId: 'id', textAlign: 'center' },
        { name: 'postCode', text: 'Post Code', textAlign: 'center' },
        { name: 'state', text: 'State', textAlign: 'center' },
        { name: 'active', text: 'Active', textAlign: 'center' },
      ],
      actionCreator: suburbActions
    }
  },
  {
    name: 'SuburbAdd',
    exact: false,
    path: '/settings/suburbs/new',
    component: SettingsAddEditPage,
    props: {
      name: 'User',
      actionCreator: suburbActions,
      form: SuburbForm
    }
  },{
    name: 'SuburbEdit',
    exact: false,
    path: '/settings/suburbs/:id',
    component: SettingsAddEditPage,
    props: {
      name: 'User',
      actionCreator: suburbActions,
      form: SuburbForm
    }
  },
  {
    name: 'UsersSearch',
    exact: true,
    path: '/settings/users',
    component: SettingsSearchPage,
    props: {
      headers: [
        { name: 'email', text: 'Email', linkTo: 'users/:id', linkToId: 'id', textAlign: 'center' },
        { name: 'firstName', text: 'First Name', textAlign: 'center'  },
        { name: 'lastName', text: 'Last Name', textAlign: 'center' },
        { name: 'companyName', text: 'Company', linkTo: 'companies/:id', linkToId: 'companyId', textAlign: 'center' },
        { name: 'active', text: 'Active', textAlign: 'center' },
      ],
      actionCreator: userActions
    }
  },
  {
    name: 'UsersAdd',
    exact: false,
    path: '/settings/users/new',
    component: SettingsAddEditPage,
    props: {
      name: 'User',
      actionCreator: userActions,
      form: UserForm
    }
  },
  {
    name: 'UsersEdit',
    exact: false,
    path: '/settings/users/:id',
    component: SettingsAddEditPage,
    props: {
      name: 'User',
      actionCreator: userActions,
      form: UserForm
    }
  },
]

const SettingsRouter = () => (
  <div>
    <Switch>
      {routes.map((route) => 
        <Route key={route.name}
          exact={route.exact}
          path={route.path}
          render={(routerProps => React.createElement(route.component,{ ...routerProps, ...route.props}))}
        />
      )}
    </Switch>
  </div>
)
export default SettingsRouter

// <Route exact path='/settings/companies' component={Company} />
// <Route path='/settings/companies/new' component={CompanyAddEdit} />
// <Route path='/settings/companies/:id' component={CompanyAddEdit} />
// <Route exact path='/settings/couriers' component={Courier} />
// <Route path='/settings/couriers/new' component={CourierAdd} />
// <Route path='/settings/couriers/:id' component={CourierEdit} />
// <Route exact path='/settings/deliverySchemes' component={DeliveryScheme} />
// <Route path='/settings/deliverySchemes/new' component={DeliverySchemeAdd} />
// <Route path='/settings/deliverySchemes/:id' component={DeliverySchemeEdit} />
// <Route exact path='/settings/lodgementFacilities' component={LodgementFacility} />
// <Route path='/settings/lodgementFacilities/new' component={LodgementFacilityAdd} />
// <Route path='/settings/lodgementFacilities/:id' component={LodgementFacilityEdit} />
// <Route exact path='/settings/serviceTypes' component={ServiceType} />
// <Route path='/settings/serviceTypes/new' component={ServiceTypeAdd} />
// <Route path='/settings/serviceTypes/:id' component={ServiceTypeEdit} />
// <Route exact path='/settings/postCodes' component={PostCode} />
// <Route path='/settings/postCodes/new' component={PostCodeAddEdit} />
// <Route path='/settings/postCodes/:id' component={PostCodeAddEdit} />
// <Route exact path='/settings/users' component={User} />
// <Route path='/settings/users/new' component={UserAddEdit} />
// <Route path='/settings/users/:id' component={UserAddEdit} />
// <Route path='/settings/packageTypes/new' component={PackageTypeAdd} />
// <Route path='/settings/packageTypes/:id' component={PackageTypeEdit} />
// <Route 
// exact 
// path='/settings/packageTypes' 
// render={(routerProps) => 
//   <SettingsSearchPage 
//     {...routerProps}
//     headers={packageTypeHeader}
//     actionCreator={packageTypeActions}
//   />} 
// />
// <Route exact path='/settings/packageTypes' component={SettingsSearchPage} tableHeader={packageTypeHeader} actionCreator={packageTypeActions} />
      