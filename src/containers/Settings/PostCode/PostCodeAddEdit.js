import React, { Component } from 'react'
import { Divider, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PostCodeForm from '../../../components/Form/SettingsForm/PostCodeForm'
import { addSuburb, getSuburb, updateSuburb } from '../../../actions/settingsAction'

class PostCodeAddEdit extends Component {
  state = {
    postCode: {
      id: '',
      suburb: '',
      postCode: '',
      state: '',
      active: true
    },
    isEdit: !!this.props.match.params.id
  }
  componentWillMount() {
    const { match } = this.props
    if (!!match.params.id){
      this.props.dispatch(getSuburb(match.params.id))
        .then((postCode) => {
          this.setState(() => ({ postCode, isEdit: true}))
        })
    }
  }
  onSubmit = ({id, suburb, postCode, state, active}) => {
    if (this.state.isEdit) {
      return this.props.dispatch(updateSuburb({id, suburb, postCode, state, active}))
    } else {
      return this.props.dispatch(addSuburb({suburb, postCode, state, active}))
    }
  }
  onBack = () => { this.props.history.push('/settings/postCodes')}
  render() {
    const { postCode, isEdit } = this.state
    return (
      <div>
        <Header as='h3'>
          { isEdit ? 'Edit' : 'New'} Suburb
          <Divider/>
        </Header>
        <PostCodeForm
          postCode={postCode}
          onBack={this.onBack}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PostCodeAddEdit)