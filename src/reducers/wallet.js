const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSES':
    return { ...state,
      expenses: [
        ...state.expenses,
        {...action.value}
      ],
    };
  case 'REMOVE_EXPENSE':
    return { ...state,
      expenses: [...action.value]
    }
  case 'CURRENCIES':
    return { ...state,
      currencies: [...action.value],
    };
  default:
    return state;
  }
};

export default wallet;
