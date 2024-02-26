const LOAD_ORDER = 'orders/loadOrder'
const CREATE_ORDER = 'orders/createOrder'
const DELETE_ORDER = 'orders/deleteOrder'

const loadOrder = (order) => {
    return {
        type: LOAD_ORDER,
        order
    }
}

const createOrder = (order) => {
    return {
        type: CREATE_ORDER,
        order
    }
}

const deleteOrder = (orderId) => {
    return {
        type: DELETE_ORDER,
        orderId
    }
}

export const loadOrderThunk = (orderId) => async(dispatch) => {
    const res = await fetch(`/api/orders/${orderId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOrder(data))
        return data
    }
}

export const createOrderThunk = (order) => async(dispatch) => {
    const res = await fetch(`/api/orders/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createOrder(data))
        return data
    }
}

export const deleteOrderThunk = (orderId) => async(dispatch) => {
    const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(deleteOrder(orderId))
    }
}

const orderReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_ORDER: {
            const newState = {...state}
            newState[action.order.id] = action.order
            return newState
        }
        case CREATE_ORDER: {
            const newState = {...state, [action.order.id]: action.order}
            return newState
        }
        case DELETE_ORDER: {
            const newState = {...state}
            delete newState[action.orderId]
            return newState
        }
        default:
            return state
    }
}

export default orderReducer
