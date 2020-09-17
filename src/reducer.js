const redux = require('redux');
const { createStore } = redux;

const initialState = {
    postsList: [],
    activePost: null,
    results: 10
}

// Reducer
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return Object.assign({}, state, {
                postsList: [
                    ...state.postsList,
                    action.post
                ]
            })
        case 'DELETE_POST':
            return Object.assign({}, state, { 
                postsList: state.postsList.filter((post) => post.id !== action.post.id)
            })
        case 'UPDATE_POST':
            return Object.assign({}, state, {
                postsList: state.postsList.map((post, index) => {
                    if(index === action.postPosition){
                        return action.post
                    }else {
                        return post
                    }
                })
            })
        case 'SET_ACTIVE_POST':
            return Object.assign({}, state, {
                activePost: action.post
            })
        case 'SHOW_MORE_RESULTS':
            return Object.assign({}, state, {
                results: state.results + action.add
            })
        default:
            return state;
    }
}


const store = createStore(postsReducer);

export default store;