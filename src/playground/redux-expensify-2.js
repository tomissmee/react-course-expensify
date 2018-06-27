import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// obj parameter has to equal OBJECT
// Add
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description, 
            note, 
            amount,
            createdAt
        }
    }
};

// Remove
const removeExpense = ({ id } = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
};

// Edit 
const editExpense = (id, update) => {
    return {
        type: 'EDIT_EXPENSE',
        id,
        update
    }
};

const expenseDefaultReducer = [];

const expenseReducer = (state = expenseDefaultReducer, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => {
                return expense.id !== action.id
            });  
        case 'EDIT_EXPENSE':   
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.update
                    }
                } else {
                    return expense;
                }
            });   
        default:
            return state;
    }
};
// filters 
const setStartDate = (startDate) => {
    return {
        type: 'SET_START_DATE',
        startDate
    }
};

const setEndDate = (endDate) => {
    return {
        type: 'SET_END_DATE',
        endDate
    }
};

const setTextFilter = (text = '') => {
    return {
        type: 'TEXT_FILTER',
        text
    }
};

const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT',
    }
};

const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE',
    }
};

const filtersDefaultState = {
        text: '',
        sortBy: 'date', // date or amount
        startDate: undefined,
        endDate: undefined
};

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_START_DATE': 
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE': 
            return {
                ...state,
                endDate: action.endDate
            } 
        case 'TEXT_FILTER': 
            return {
                ...state,
                text: action.text
            }  
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }    
        default:
            return state;
    }
};

// get visible expense
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return b.createdAt - a.createdAt;
        } else if(sortBy === 'amount') {
            return b.amount - a.amount;
        }
    });
};

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    // console.log(state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const exA = store.dispatch(addExpense({ description: 'rent', amount: 8000, createdAt: -21000 }));
const exB = store.dispatch(addExpense({ description: 'coffee', amount: 3000, createdAt: -1000 }));


// store.dispatch(setStartDate(0));
// store.dispatch(setEndDate(2000));
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
// store.dispatch(editExpense(ex2.expense.id, {description: 'edit test', note: 'edit test'}));

