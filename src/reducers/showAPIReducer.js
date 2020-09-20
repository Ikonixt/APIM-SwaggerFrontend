const showAPIInitial = {
    show: false,
    url: '',
    tag: '',
    id: 0
}
const showAPIReducer = (state = showAPIInitial, action) => {
    switch (action.type) {
        case 'SHOW':
            state = {
                ...state,
                show: action.payload
            }
            break;   
        case 'URL':
                state = {
                    ...state,
                    url: action.payload
                }
                break;
        case 'TAG':
            state = {
                ...state,
                tag: action.payload
            }
            break;
        case 'ID':
            state = {
                ...state,
                id: action.payload
            }
        default:
            break;
    }
    return state;
}

export default showAPIReducer;