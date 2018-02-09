import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, defaultProps, pure, setDisplayName,  withHandlers } from 'recompose'
import { connect } from 'react-redux'
import DataTable from '../../../components/DataTable'
import CompanyAddEdit from './CompanyAddEdit'
import { deleteCompany, getCompaniesData } from '../../../actions/settingsAction'

const Company = ({ fetchData, headers, onAddItem, onDeleteItem}) => (
  <div>
    <DataTable
      fetchData={fetchData}
      headers={headers}
      onAddItem={onAddItem}
      onDeleteItem={onDeleteItem}
    />
  </div>
)

Company.defaultProps = {
  fetchData: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}

export {
  CompanyAddEdit
}

const mapStateToProps = ({ theme }) => ({
  theme
})
const mapDispatchToProps = (dispatch) => ({
  fetchData: (filter) => dispatch(getCompaniesData(filter)),
  onDeleteItem: (id) => dispatch(deleteCompany(id))
})
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  setDisplayName('CompanySearch'),
  defaultProps({
    headers: [
      { name: 'name', text: 'Company Name', linkTo: 'companies/:id', linkToId: 'id' },
      { name: 'parentCompanyName', text: 'Parent Company', linkTo: 'companies/:id', linkToId: 'parentId', textAlign: 'center' },
      { name: 'contactPerson', text: 'Contact Person', textAlign: 'center' },
      { name: 'email', text: 'Contact Email', textAlign: 'center', mailTo: true },
      { name: 'phone', text: 'Phone Number', textAlign: 'center' },
      { name: 'active', text: 'Active', textAlign: 'center' },
    ]
  }),
  withHandlers({
    onAddItem: ({ history, location }) => () => { history.push(`${location.pathname}/new`) }
  })
)(Company);