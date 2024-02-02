const LOAD_USERS = 'users/loadUsers'
const LOAD_ONE_USER = 'users/loadOneUser'

const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

const loadOneUser = (user) => {
    return {
        type: LOAD_ONE_USER,
        user
    }
}

export const loadUsersThunk = () => async(dispatch) => {
    const res = await fetch('/api/users')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUsers(data))
        return data
    }
}

export const loadOneUserThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneUser(data))
        return data
    }
}

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_USERS: {
            const newState = {}
            action.users.users.forEach(user => {
                newState[user.id] = user
            })
            return newState
        }
        case LOAD_ONE_USER: {
            const newState = {}
            newState[action.user.id] = action.user
            return newState
        }
        default:
            return state
    }
}

export default userReducer
