import React, { Component } from 'react'
import { Divider, Input, Segment } from 'semantic-ui-react'

const TrackParcel = (props) => (
  <div>  
    <Segment>
        <Input fluid  action={{ icon: 'search', color: props.theme.color }} icon='dropbox' iconPosition='left' placeholder='Track Parcel' />
      <Divider />
    </Segment>
  </div>
)

export default TrackParcel