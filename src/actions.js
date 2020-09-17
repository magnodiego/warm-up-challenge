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

const setDetailsPostAction = (post)=>{
    return {
        type: 'SET_DETAILS_POST',
        post
    }
}

const setEditPostAction = (post)=>{
    return {
        type: 'SET_EDIT_POST',
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
    setDetailsPostAction,
    setEditPostAction,
    moreResultsAction
}

export default actions;