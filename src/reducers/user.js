const user = (state = { email: '' }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, email: action.value};
    default:
      return state;
  }
};

export default user;
