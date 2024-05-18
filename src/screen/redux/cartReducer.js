// cartReducer.js
const initialState = {
    cart: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      case 'INCREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      case 'DECREASE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  