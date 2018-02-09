const uiReducerDefaultState = {
  toggleSideBar: true
}

export default (state = uiReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TOGGLE_SIDEBAR':
      return {
        ...state,
        toggleSideBar: !state.toggleSideBar
      }
    default:
      return state
  }
}