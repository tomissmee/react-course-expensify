import { createStore } from 'redux';

// payload is an object
const incrementBy = ({incrementBy = 1} = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy
    }
};

const decrementBy = ({ decrementBy = 1} = {}) => {
    return {
        type: 'DECREMENT',
        decrementBy
    }
};

const setCount = ({ count }) => {
    return {    
        type: 'SET',
        count
    }
};

const reset = () => {
    return {
        type: 'RESET'
    }
}
// const incrementBy = (payload = {}) => {
//     return {
//         type: 'INCREMENT',
//         incrementBy: payload.incrementBy ? payload.incrementBy : 1
//     }
// }

// Reducer
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            const decrement = action.decrementBy
            return {
                count: state.count - decrement
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            state;
    }
};

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementBy({incrementBy: 5}));

store.dispatch(incrementBy());

store.dispatch(decrementBy({decrementBy: 5}));

store.dispatch(decrementBy());

store.dispatch(setCount({ count: 80 }));

store.dispatch(reset());
// store.dispatch({
//     type: 'RESET',
// });
