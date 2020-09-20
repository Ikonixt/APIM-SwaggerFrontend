const filterInitial = {
    change: ''
}

const filterReducer = (state = filterInitial, action) => {
    switch (action.type) {
      case "CHANGE":
          state = {
              ...state,
              change: action.payload
          }
          break;
      default:
          break;
    }
    return state;
  }

  export default filterReducer;