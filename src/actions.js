const addPostAction = (post)=>{
    return {
        type: 'ADD_POST',
        post
    }
}

const deletePostAction = (post)=>{
    return {
        type: 'DELETE_POST',
        post
    }
}

const updatePostAction = (post, postPosition)=>{
    return {
        type: 'UPDATE_POST',
        post,
        postPosition
    }
}

const setActivePostAction = (post)=>{
    return {
        type: 'SET_ACTIVE_POST',
        post
    }
}

const moreResultsAction = ()=>{
    return {
        type: 'SHOW_MORE_RESULTS',
        add: 10
    }
}

const actions = {
    addPostAction,
    deletePostAction,
    updatePostAction,
    setActivePostAction,
    moreResultsAction
}

export default actions;