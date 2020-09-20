const alertInitial = {
    alert: false,
    type: '',
    message: '',
    disabled: false
}
const alertReducer = (state = alertInitial, action) => {
    switch (action.type) {
    case "ALERT":
        state = {
            ...state,
            alert: action.payload
        }
        break;
    case "TYPE":
        state = {
            ...state,
            type: action.payload
        }
        break;
    case "MESSAGE":
        state = {
            ...state,
            message: action.payload
        }
        break;
    case "DISABLED":
        state = {
            ...state,
            disabled: action.payload
        }
        break;
    default:
        break;
  }
  return state;
}

export default alertReducer;