const LOAD_PRODUCTS = 'products/loadProducts'
const LOAD_ONE_PRODUCT = 'products/loadOneProduct'
const LOAD_CATEGORY_PRODUCTS = 'products/loadCategoryProducts'
const MANAGE_PRODUCTS = 'products/manageProducts'
const CREATE_PRODUCT = 'products/createProduct'
const UPDATE_PRODUCT = 'products/updateProduct'
const DELETE_PRODUCT = 'products/deleteProduct'
// const LOAD_PRODUCT_IMAGES = 'products/loadProductImages'

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

const loadCategoryProducts = (products, category) => {
    return {
        type: LOAD_CATEGORY_PRODUCTS,
        products, category
    }
}

// const loadProductImages = (images) => {
//     return {
//         type: LOAD_PRODUCT_IMAGES,
//         images
//     }
// }

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

//  main purposes of thunk actions
//  1. send fetch request
//  2. update data into redux store
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

export const loadCategoryProductsThunk = (category) => async(dispatch) => {
    const res = await fetch(`/api/products/category/${category}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadCategoryProducts(data.product_categories, category))
        return data
    }
}

// export const loadProductImagesThunk = () => async(dispatch) => {
//     const res = await fetch(`/api/products/images`)

//     if (res.ok) {
//         const data = await res.json()
//         dispatch(loadProductImages(data))
//         return data
//     }
// }

export const manageProductsThunk = () => async(dispatch) => {
    const res = await fetch('/api/products/manage')

    if (res.ok) {
        const data = await res.json()
        dispatch(manageProducts(data))
        return data
    }
}

export const createProductThunk = (product) => async(dispatch) => {
    const res = await fetch('/api/products/new', {
        method: 'POST',
        body: product
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createProduct(data))
        return data
    }
}

export const updateProductThunk = (product, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/edit`, {
        method: 'PUT',
        body: product
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
            // we use the spread operator to keep copying over the old state
            // this makes sure that all of our info stays consistent across pages and can help speed up navigation when revisiting pages we have already been to
            const newState = {}
            action.products.products.forEach(product => {
                newState[product.id] = product
            })
            return newState
        }
        case LOAD_ONE_PRODUCT: {
            const newState = {...state}
            newState[action.product.id] = action.product
            return newState
        }
        case LOAD_CATEGORY_PRODUCTS: {
            let newState = {...state}
            newState[action.category] = {}
            action.products.forEach(product => {
                newState[action.category][product.id] = product
            })
            return newState
        }
        // case LOAD_PRODUCT_IMAGES: {
        //     const newState = {}
        //     action.images.images.forEach(image => {
        //         newState[image.id] = image
        //     })
        //     return newState
        // }
        case MANAGE_PRODUCTS: {
            const newState = {}
            action.products.user_products.forEach(product => {
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
            // need this second delete so that we ensure that things delete from the local categories state at the same time they are deleted from the database and the overall state
            // delete newState[category][productId]
            return newState
        }
        default:
            return state
    }
}

export default productReducer
