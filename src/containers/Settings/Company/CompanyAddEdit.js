import React, { Component } from 'react'
import { compose, lifecycle, mapProps, onlyUpdateForKeys, setDisplayName,  withHandlers, withState } from 'recompose'
import { Divider, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import CompanyForm from '../../../components/Form/SettingsForm/CompanyForm'
import { addCompany, getCompany, updateCompany } from '../../../actions/settingsAction'

const CompanyAddEdit = ({ company, isEdit, onBack, onSubmit }) => (
  <div>
    <Header as='h3'>
      { isEdit ? 'Edit' : 'New'} Company
      <Divider/>
    </Header>
    <CompanyForm
      company={company}
      onBack={onBack}
      onSubmit={onSubmit}
    />
  </div>
)

export default compose(
  connect(),
  mapProps((props) => ({ 
    ...props, 
    isEdit: !!props.match.params.id
  })),
  withState('company', 'setCompany', {}),
  withHandlers({
    onSubmit: ({ isEdit, dispatch }) => (values) => {
      if (isEdit) {
        return dispatch(updateCompany(values))
      } else {
        return dispatch(addCompany(values))
      }
    },
    onBack: ({ history }) => () => history.goBack()
  }),
  lifecycle({
    componentDidMount() {
      const { match } = this.props
      if (!!match.params.id){
        this.props.dispatch(getCompany(match.params.id))
          .then((company) => {
            this.props.setCompany(company)
          })
      }
    },
  }),
  onlyUpdateForKeys(['company']),
)(CompanyAddEdit)