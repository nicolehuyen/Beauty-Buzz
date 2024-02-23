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

const deleteOrder = (order) => {
    return {
        type: DELETE_ORDER,
        order
    }
}
