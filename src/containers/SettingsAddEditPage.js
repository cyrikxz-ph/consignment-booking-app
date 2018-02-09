import React, { Component } from 'react'
import { compose, lifecycle, mapProps, onlyUpdateForKeys, setDisplayName,  withHandlers, withState } from 'recompose'
import { Divider, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

const SettingsAddEditPage = ({ name, data, form, isEdit, onBack, onSubmit }) => (
  <div>
    <Header as='h3'>
      { isEdit ? `Update ${name}` : `Add ${name}`}
      <Divider/>
    </Header>
    {React.createElement(form, {
      isEdit,
      data,
      onBack,
      onSubmit,
    })}
  </div>
)

export default compose(
  connect(),
  mapProps((props) => ({ 
    ...props, 
    isEdit: !!props.match.params.id
  })),
  withState('data', 'setData', {}),
  withHandlers({
    onSubmit: ({ isEdit, actionCreator, dispatch }) => (values) => {
      if (isEdit) {
        return dispatch(actionCreator.update(values))
      } else {
        return dispatch(actionCreator.add(values))
      }
    },
    onBack: ({ history }) => () => history.goBack()
  }),
  lifecycle({
    componentWillMount() {
      const { match, onBack, dispatch, actionCreator } = this.props
      if (!!match.params.id){
        dispatch(actionCreator.findById(match.params.id))
          .then((data) => {
            this.props.setData(data)
          })
          .catch((e) => {
            console.log(e)
            onBack()
          })
      }
    },
  }),
  onlyUpdateForKeys(['data']),
)(SettingsAddEditPage)