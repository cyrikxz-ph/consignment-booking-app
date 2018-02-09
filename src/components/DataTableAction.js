import React from 'react'
import { Button, Grid, Input, Popup } from 'semantic-ui-react'

const DataTableAction = (props) => (
  <Grid>
    <Grid.Column computer={8}>
      <Input
        icon='search'
        placeholder='Search'
        onChange={(e) => props.onChangeSearchText(e.target.value)}
        value={props.searchText}
        style={{ borderRadius: '25px'}}
      />
    </Grid.Column>
    <Grid.Column computer={8} mobile={16}  textAlign='right'>
      <Button 
        color={props.color}
        icon='refresh'
        content='Refresh'
        onClick={props.onRefresh}
      />
      <Button
        color={props.color}
        icon='add'
        content='Add New'
        onClick={props.onAddItem}
      />
    </Grid.Column>
  </Grid>
)

export default DataTableAction

// <Button
// basic
// icon='filter'
// active={props.toggleFilter}
// onClick={props.onToggleFilter}
// color={ props.toggleFilter ? props.color : undefined }
// />

// <Popup
// trigger={
//   <Button
//     basic
//     icon='ellipsis vertical'
//     color={ props.color }
//   />
// }
// content="Other Actions"
// basic
// />