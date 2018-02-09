import React from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'

const DataTableFooter = (props) => (
  <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell colSpan={props.columnCount}>
        {props.children}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
)

export default DataTableFooter