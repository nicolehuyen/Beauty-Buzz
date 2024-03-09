const LOAD_SHOPPING_BAG = 'bag/loadShoppingBag'
const CREATE_BAG_ITEM = 'bag/createBagItem'
const UPDATE_BAG_ITEM = 'bag/updateBagItem'
const DELETE_BAG_ITEM = 'bag/deleteBagItem'
const CLEAR_BAG = 'bag/clearBag'

const loadShoppingBag = (items) => {
    return {
        type: LOAD_SHOPPING_BAG,
        items
    }
}

const createBagItem = (item) => {
    return {
        type: CREATE_BAG_ITEM,
        item
    }
}

const updateBagItem = (item) => {
    return {
        type: UPDATE_BAG_ITEM,
        item
    }
}

const deleteBagItem = (itemId) => {
    return {
        type: DELETE_BAG_ITEM,
        itemId
    }
}

const clearBag = () => {
    return {
        type: CLEAR_BAG
    }
}

export const loadShoppingBagThunk = () => async(dispatch) => {
    const res = await fetch('/api/bag/')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadShoppingBag(data))
        return data
    }
}

export const createBagItemThunk = (item) => async(dispatch) => {
    const res = await fetch(`/api/bag/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createBagItem(data))
        return data
    }
}

export const updateBagItemThunk = (item, itemId) => async(dispatch) => {
    const res = await fetch(`/api/bag/${itemId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateBagItem(data))
        return data
    }
}

export const deleteBagItemThunk = (itemId) => async(dispatch) => {
    const res = await fetch(`/api/bag/${itemId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(deleteBagItem(itemId))
    }
}

export const clearBagThunk = () => async(dispatch) => {
    const res = await fetch('/api/bag/clear', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(clearBag())
    }
}

const shoppingBagReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_SHOPPING_BAG: {
            const newState = {}
            action.items.bag_items.forEach(item => {
                newState[item.id] = item
            })
            return newState
        }
        case CREATE_BAG_ITEM: {
            const newState = { ...state, [action.item.id]: action.item }
            return newState
        }
        case UPDATE_BAG_ITEM: {
            const newState = { ...state, [action.item.id]: action.item }
            return newState
        }
        case DELETE_BAG_ITEM: {
            const newState = {...state}
            delete newState[action.itemId]
            return newState
        }
        case CLEAR_BAG: {
            return {}
        }
        default:
            return state
    }
}

export default shoppingBagReducer
