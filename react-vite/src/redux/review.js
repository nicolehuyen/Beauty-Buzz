const LOAD_REVIEWS = 'reviews/loadReviews'
const LOAD_PRODUCT_REVIEWS = 'reviews/loadProductReviews'
const CREATE_REVIEW = 'reviews/createReview'
const UPDATE_REVIEW = 'reviews/updateReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const loadProductReviews = (reviews) => {
    return {
        type: LOAD_PRODUCT_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const loadReviewsThunk = () => async(dispatch) => {
    const res = await fetch('/api/reviews')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadReviews(data))
        return data
    }
}

export const loadProductReviewsThunk = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadProductReviews(data))
        return data
    }
}

export const createReviewThunk = (review, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createReview(data))
        return data
    }
}

export const updateReviewThunk = (review, productId, reviewId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateReview(data))
        return data
    }
}

export const deleteReviewThunk = (productId, reviewId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

const reviewReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state}
            action.reviews.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case LOAD_PRODUCT_REVIEWS: {
            const newState = {}
            action.reviews.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state, [action.review.id]: action.review }
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = { ...state, [action.review.id]: action.review }
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
