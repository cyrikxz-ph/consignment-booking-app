import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import DataTable from '../components/DataTable'

const SettingsSearchPage = ({ fetchData, headers, onAddItem, onDeleteItem }) => {
  return(
    <DataTable
      fetchData={fetchData}
      headers={headers}
      onAddItem={onAddItem}
      onDeleteItem={onDeleteItem}
    />
  )
}

SettingsSearchPage.defaultProps = {
  fetchData: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  actionCreator: PropTypes.object.isRequired,
}

const mapStateToProps = ({ theme }) => ({
  theme
})
const mapDispatchToProps = (dispatch, props) => ({
    fetchData: (filter) => dispatch(props.actionCreator.searchData(filter)),
    onDeleteItem: (id) => dispatch(props.actionCreator.destroy(id))
})
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
  setDisplayName('SettingsSearchPage'),
  withHandlers({
    onAddItem: ({ history, location }) => () => { history.push(`${location.pathname}/new`) }
  })
)(SettingsSearchPage);