import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Label, Popup, Table } from 'semantic-ui-react'

const DataTableRow = (props) => (
  <Table.Row>
    <Table.Cell collapsing>
      <Checkbox
        checked={props.selected}
        onChange={() => { props.onSelectItem() }}
      />
    </Table.Cell>
    {props.headers.map((column, index) => {
      if (typeof props.data[column.name] === 'boolean') {
        return (
            <Table.Cell
              key={index}
              textAlign={column.textAlign || 'left' }
            >
              <Label color={props.data[column.name] ? 'green' : 'grey'}>
                {props.data[column.name] ? 'YES' : 'NO'}
              </Label>
            </Table.Cell>
          )
      } else if (column.linkTo) {
        return (
          <Table.Cell
            key={index}
            textAlign={column.textAlign || 'left' }
          >
            <Link to={column.linkTo.replace(':id', props.data[column.linkToId])}>
              {props.data[column.name]}
            </Link>
          </Table.Cell>
        )
      } else if (column.mailTo) {
        return (
          <Table.Cell
            key={index}
            textAlign={column.textAlign || 'left' }
          >
            <a href={"mailto:" + props.data[column.name]}>{props.data[column.name]}</a>
          </Table.Cell>
        )
      } else {
        return (
          <Table.Cell 
            key={index}
            textAlign={column.textAlign || 'left' }
          >
            {props.data[column.name]}
          </Table.Cell>
        )
      }
    })}
    <Table.Cell collapsing>
      <Popup
        trigger={
          <Button 
            basic
            icon='trash outline'
            onClick={(e) => { props.onReqestDeleteItem() }}
          />
        }
        content='Delete'
        offset={50}
        size='tiny'
        basic
      />
    </Table.Cell>
  </Table.Row>
)
export default DataTableRow