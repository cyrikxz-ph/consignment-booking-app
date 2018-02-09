const themeReducerDefaultState = {
  color: 'orange'
}

export default (state = themeReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_COLOR_THEME':
      return {
        ...state,
        color: state.color
      }
    default:
      return state
  }
}