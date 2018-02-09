import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Confirm, Dropdown, Segment, Table } from 'semantic-ui-react'
import DataTableHeader from './DataTableHeader'
import DataTableAction from './DataTableAction'
import DataTableFooter from './DataTableFooter'
import DataTablePagination from './DataTablePagination'
import DataTableRow from './DataTableRow'


class DataTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      // data: this.transformData(this.props.dataKey, this.props.data),
      data: [],
      totalCount: 0,
      forRemoval: [],
      filter: {
        searchText: '',
        limit: this.props.filter.limit,
        pageNumber: this.props.filter.pageNumber,
        pageNumberTotal: Math.ceil(this.props.totalCount / this.props.filter.limit),
        sort: {
          direction: this.props.filter.sort.direction || 'ascending',
          column: this.props.filter.sort.column || this.props.headers[0].name
        }
      },
      ui: {
        color: this.props.color,
        toggleFilter: false,
        selectedAll: false,
        confirmDeleteToggle: false,
        loading: false
      }
    }
  }
  componentWillMount() {
    this.setState((prevState) => ({ ui: { ...prevState.ui, loading: true}}))
    this.fetchData(this.state.filter)
      .then(({ data, totalCount}) => {
        this.setState((prevState) => ({ 
          ui: { 
            ...prevState.ui, 
            loading: false
          },
          data: this.transformData(this.props.dataKey, data),
          totalCount
        }))
      })
  }
  onChangeSearchText = (searchText) => {
    const { filter } = this.state
    this.setState(
      (prevState) => ({ ui: { ...prevState.ui, loading: true}}),
      () => {
        this.fetchData({...filter, searchText: searchText})
          .then(({ data, totalCount}) => {
            this.setState((prevState) => ({
              filter: { 
                ...prevState.filter, 
                searchText: searchText
              },
              data: this.transformData(this.props.dataKey, data),
              totalCount,
              ui: { ...prevState.ui, loading: false}
            }))
          })
      }
    )
    
  }
  onPagePrev = () => { 
    const { filter, totalCount } = this.state
    if (filter.pageNumber !== 1) {
      this.setState(
        (prevState) => ({ ui: { ...prevState.ui, loading: true}}),
        () => {
          this.fetchData({...filter, pageNumber: filter.pageNumber - 1})
            .then(({ data, totalCount}) => {
              this.setState((prevState) => ({
                filter: { 
                  ...prevState.filter, 
                  pageNumber: prevState.filter.pageNumber - 1
                },
                data: this.transformData(this.props.dataKey, data),
                totalCount,
                ui: { ...prevState.ui, loading: false}
              }))
            })
        }
      )
    }
  }
  onPageNext = () => {
    const { totalCount, filter } = this.state
    if (Math.ceil(totalCount / filter.limit) > filter.pageNumber) {
      this.setState(
        (prevState) => ({ ui: { ...prevState.ui, loading: true}}),
        () => {
          this.fetchData({...filter, pageNumber: filter.pageNumber + 1})
            .then(({ data, totalCount}) => {
              this.setState((prevState) => ({
                filter: { 
                  ...prevState.filter, 
                  pageNumber: prevState.filter.pageNumber + 1
                },
                data: this.transformData(this.props.dataKey, data),
                totalCount,
                ui: { ...prevState.ui, loading: false}
              }))
            })
        }
      )
    }
  }
  onChangePageLimit = (limit) => {
    this.setState(
      (prevState) => ({ ui: { ...prevState.ui, loading: true}}),
      () => {
        const { filter } = this.state
        this.fetchData({ ...filter, limit })
          .then(({ data, totalCount}) => {
            this.setState((prevState) => ({
              data: this.transformData(this.props.dataKey, data),
              totalCount,
              filter: {
                ...prevState.filter,
                pageNumber: 1,
                limit
              },
              ui: { 
                ...prevState.ui, 
                loading: false
              }
            }))
          })
      }
    )
  }
  onSelectItem = (rowKey) => {
    this.setState((prevState) => {
      const data = prevState.data.map((rowData) => {
        return rowData.key === rowKey ? {...rowData, selected: !rowData.selected} : rowData
      })
      return {
        data,
        ui: {
          ...prevState.ui,
          selectedAll: data.filter((rowData) => rowData.selected === false).length === 0
        }
      }
    })
  }
  onEditItem = (id) => {
    this.props.onEditItem(id)
  }
  onRefresh = () => {
    this.setState(
      (prevState) => ({ ui: { ...prevState.ui, loading: true}}),
      () => {
        const { filter } = this.state
        this.fetchData({ filter })
          .then(({ data, totalCount}) => {
            this.setState((prevState) => ({
              data: this.transformData(this.props.dataKey, data),
              totalCount,
              ui: { ...prevState.ui, loading: false}
            }))
          })
      }
    )
  }
  onAddItem = () => {
    this.props.onAddItem()
  }
  onReqestDeleteItem = (rowKey) => { 
    this.setState((prevState) => (
      { 
        ui: {
        ...prevState.ui, 
        confirmDeleteToggle: true
        },
        forRemoval: rowKey
      }
    ))
  }
  onConfirmedDeleteItem = (answer) => {
    if (answer) {
      this.setState((prevState) => ({ ui: { ...prevState.ui, loading: true}}))
      const { filter, forRemoval } = this.state
      this.props.onDeleteItem(forRemoval)
        .then(() => {
          const { filter } = this.state
          return this.fetchData(filter)
        })
        .then(({ data, totalCount}) => {
          this.setState((prevState) => ({
            data: this.transformData(this.props.dataKey, data),
            totalCount,
            forRemoval: '',
            ui: { 
              ...prevState.ui, 
              confirmDeleteToggle: false,
              loading: false
            }
          }))
        })
        .catch((e) => {
          this.setState((prevState) => ({ 
            ui: {
            ...prevState.ui,
            confirmDeleteToggle: false,
            loading: false
            },
            forRemoval: ''
          }))
          console.log('Failed')
        })
    } else {
      this.setState((prevState) => ({ 
        ui: {
        ...prevState.ui, 
        confirmDeleteToggle: false 
        },
        forRemoval: ''
      }))
    }
  }
  onToggleFilter = () => {
    this.setState((prevState) => ({ ui: {...prevState.ui, toggleFilter: !prevState.ui.toggleFilter }}))
  }
  onChangeSort = (column) => {
    this.setState(
      (prevState) => ({ ui: { ...prevState.ui, loading: true}}),
      () => {
        const { filter } = this.state
        const { column: prevColumn, direction: prevDirection } = filter.sort
        const newSort = {
          column,
          direction: prevColumn !== column
                      ? 'ascending'
                      : prevDirection === 'ascending' ? 'descending' : 'ascending'
        }
        this.fetchData({...filter, sort: newSort })
          .then(({ data, totalCount}) => {
            this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                sort: newSort
              },
              data: this.transformData(this.props.dataKey, data),
              totalCount,
              ui: { ...prevState.ui, loading: false}
            }))
          })
      }
    )
  }
  onSelectAll = () => {
    this.setState((prevState) => {
      const data = prevState.data.map((rowData) => ({ ...rowData, selected: !prevState.ui.selectedAll}))
      return {
        data,
        ui: {
          ...prevState.ui,
          selectedAll: !prevState.ui.selectedAll
        }
      }
    })
  }
  fetchData = ({ limit = 10, pageNumber = 1, searchText = '', sort = {}}) => {
    return this.props.fetchData({ limit, pageNumber, searchText, sort})
  }
  transformData = (dataKey, data) => (data && data.map((rowData) => ({key: rowData[dataKey], selected: false, ...rowData })))

  render () {
    const { data, totalCount, filter, ui } = this.state
    const { headers, dataKey, limitOptions } = this.props;
    return (
      <Segment loading={ui.loading}>
        <Confirm
          open={this.state.ui.confirmDeleteToggle}
          onCancel={() => this.onConfirmedDeleteItem(false)}          
          onConfirm={() => this.onConfirmedDeleteItem(true)}
        />
        <DataTableAction
          toggleFilter={ui.toggleFilter}
          onToggleFilter={this.onToggleFilter}
          onChangeSearchText={this.onChangeSearchText}
          searchText={filter.searchText}
          onAddItem={this.onAddItem}
          onRefresh={this.onRefresh}
        />
        <Table sortable celled compact selectable striped >
          <DataTableHeader 
            headers={headers}
            onChangeSort={this.onChangeSort}
            sort={filter.sort}
            selectedAll={ui.selectedAll}
            onSelectAll={() => this.onSelectAll()}
          />
          <Table.Body>
            {data && data.map((rowData, index) => {
              return (
                <DataTableRow 
                  key={rowData[dataKey]}
                  headers={headers}
                  selected={rowData.selected}
                  data={rowData}
                  dataKey={dataKey}
                  onSelectItem={() => { this.onSelectItem(rowData.key)}}
                  onReqestDeleteItem={() => { this.onReqestDeleteItem(rowData.key)}}
                  onEditItem={() => { this.onEditItem(rowData.key) }}
                />
              )
            })}
          </Table.Body>
          <DataTableFooter
            columnCount={headers.length + 2}
          >
            <Dropdown
              compact
              selection
              onChange={(e, { value }) => { this.onChangePageLimit(value)}}
              options={limitOptions}
              value={filter.limit}
            />
            <DataTablePagination
              pageNumberCurrent={filter.pageNumber}
              pageNumberTotal={Math.ceil(totalCount / filter.limit)}
              onPagePrev={this.onPagePrev}
              onPageNext={this.onPageNext}
            />
          </DataTableFooter>
        </Table>
      </Segment>
    )
  }
}

DataTable.propTypes = {
  color: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  fetchData: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}

DataTable.defaultProps = {
  data: [],
  totalCount: 0,
  dataKey: 'id',
  filter: {
    limit: 10,
    pageNumber: 1,
    pageNumberTotal: 10,
    sort: {
      direction: '',
      column: ''
    }
  },
  limitOptions: [
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: '50', value: 50 },
    { text: '100', value: 100 },
  ],
  fetchData: () => { return Promise.resolve([], 0)},
  onAddItem: () => {},
  onEditItem: () => {},
  onDeleteItem: () => {}
}

export default DataTable;