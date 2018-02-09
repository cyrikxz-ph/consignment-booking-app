import React from 'react'
import { Table, Checkbox } from 'semantic-ui-react'


const DataTableHeader = (props) => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox
          checked={props.selectedAll}
          onChange={() => {props.onSelectAll()}}
        />
      </Table.HeaderCell>
      { props.headers.map((header) => (
        <Table.HeaderCell
          key={header.name}
          textAlign='center'
          sorted={props.sort.column === header.name ? props.sort.direction : undefined}
          onClick={() => {
            props.onChangeSort(header.name)
          }}
        >
          {header.text ? header.text : header.name}
        </Table.HeaderCell>
      ))}
      <Table.HeaderCell textAlign='center'>
        Action
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
)

export default DataTableHeader