const initialState = {
  products: []
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS': {
      return Object.assign({}, state, {
        products: action.data
      })
    }
    default:
      return state
  }
}