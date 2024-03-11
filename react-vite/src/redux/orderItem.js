const LOAD_ORDER_ITEMS = 'orderItems/loadOrderItems'
const CREATE_ORDER_ITEM = 'orderItems/createOrderItem'
const DELETE_ORDER_ITEM = 'orderItems/deleteOrderItem'

const loadOrderItems = (items) => {
    return {
        type: LOAD_ORDER_ITEMS,
        items
    }
}

const createOrderItem = (item) => {
    return {
        type: CREATE_ORDER_ITEM,
        item
    }
}

const deleteOrderItem = (item) => {
    return {
        type: DELETE_ORDER_ITEM,
        item
    }
}

export const loadOrderItemsThunk = (orderId) => async(dispatch) => {
    const res = await fetch(`/api/orders/${orderId}/items`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOrderItems(data))
        return data
    }
}

export const createOrderItemThunk = (orderId, item) => async(dispatch) => {
    const res = await fetch(`/api/orders/${orderId}/items`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createOrderItem(data))
        return data
    }
}

export const deleteOrderItemThunk = (orderId, itemId) => async(dispatch) => {
    const res = await fetch(`/api/orders/${orderId}/items/${itemId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(deleteOrderItem(itemId))
    }
}

const orderItemReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_ORDER_ITEMS: {
            const newState = {}
            action.items.items.forEach(item => {
                newState[item.id] = item
            })
            return newState
        }
        case CREATE_ORDER_ITEM: {
            const newState = { ...state, [action.item.id]: action.item }
            return newState
        }
        case DELETE_ORDER_ITEM: {
            const newState = {...state}
            delete newState[action.itemId]
            return newState
        }
        default:
            return state
    }
}

export default orderItemReducer
