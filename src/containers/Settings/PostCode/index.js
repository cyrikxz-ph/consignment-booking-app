import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import DataTable from '../../../components/DataTable'
import { deleteSuburb, getSuburbsData } from '../../../actions/settingsAction'

class PostCode extends Component {
  state = {
    headers: [
      { name: 'suburb', text: 'Suburb', linkTo: 'postCodes/:id', linkToId: 'id', textAlign: 'center' },
      { name: 'postCode', text: 'Post Code', textAlign: 'center' },
      { name: 'state', text: 'State', textAlign: 'center' },
      { name: 'active', text: 'Active', textAlign: 'center' },
    ],
    data: [],
    totalCount: 0
  }
  onAddNew = () => {
    this.props.history.push(`${this.props.location.pathname}/new`)
  }
  fetchData = (filter) => {
    return this.props.dispatch(getSuburbsData(filter))
  }
  onDeleteItem = (id) => {
    return this.props.dispatch(deleteSuburb(id))
  }
  render() {
    const { data, headers, loading, totalCount } = this.state
    return(
        <DataTable
          headers={headers}
          fetchData={this.fetchData}
          onAddItem={this.onAddNew}
          onDeleteItem={this.onDeleteItem}
        />
    )
  }
}
// export {
//   PostCodeAddEdit
// }
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PostCode);