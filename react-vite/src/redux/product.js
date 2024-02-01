const LOAD_PRODUCTS = 'products/loadProducts'
const LOAD_ONE_PRODUCT = 'products/loadOneProduct'
const MANAGE_PRODUCTS = 'products/manageProducts'
const CREATE_PRODUCT = 'products/createProduct'
const UPDATE_PRODUCT = 'products/updateProduct'
const DELETE_PRODUCT = 'products/deleteProduct'

const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

const loadOneProduct = (product) => {
    return {
        type: LOAD_ONE_PRODUCT,
        product
    }
}

const manageProducts = (products) => {
    return {
        type: MANAGE_PRODUCTS,
        products
    }
}

const createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
    }
}

const updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}

const deleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

export const loadProductsThunk = () => async(dispatch) => {
    const res = await fetch('/api/products')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadProducts(data))
        return data
    }
}

export const loadOneProductThunk = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneProduct(data))
        return data
    }
}

export const manageProductsThunk = () => async(dispatch) => {
    const res = await fetch('/api/products/manage')

    if (res.ok) {
        const data = await res.json()
        dispatch(manageProducts(data))
        return data
    }
}

export const createProductThunk = (product, image) => async(dispatch) => {
    const res = await fetch('/api/products/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })

    if (res.ok) {
        const data = await res.json()

        const productImage = await fetch(`/api/products/${data.id}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                image: image
            })
        })

        const imageData = await productImage.json()

        dispatch(createProduct(imageData))
        return data
    }
}

export const updateProductThunk = (product, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/edit`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateProduct(data))
        return data
    }
}

export const deleteProductThunk = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(deleteProduct(productId))
    }
}

const productReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_PRODUCTS: {
            const newState = {}
            action.products.products.forEach(product => {
                newState[product.id] = product
            })
            return newState
        }
        case LOAD_ONE_PRODUCT: {
            const newState = {}
            newState[action.product.id] = action.product
            return newState
        }
        case MANAGE_PRODUCTS: {
            const newState = {}
            action.products.products.forEach(product => {
                newState[product.id] = product
            })
            return newState
        }
        case CREATE_PRODUCT: {
            const newState = { ...state, [action.product.id]: action.product }
            return newState
        }
        case UPDATE_PRODUCT: {
            const newState = { ...state, [action.product.id]: action.product }
            return newState
        }
        case DELETE_PRODUCT: {
            const newState = { ...state }
            delete newState[action.productId]
            return newState
        }
        default:
            return state
    }
}

export default productReducer
