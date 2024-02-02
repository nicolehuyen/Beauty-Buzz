// const LOAD_PRODUCT_IMAGES = 'products/loadProductImages'

// const loadProductImages = (images) => {
//     return {
//         type: LOAD_PRODUCT_IMAGES,
//         images
//     }
// }

// export const loadProductImagesThunk = () => async(dispatch) => {
//     const res = await fetch(`/api/products/images`)

//     if (res.ok) {
//         const data = await res.json()
//         dispatch(loadProductImages(data))
//         return data
//     }
// }

// const imageReducer = (state = {}, action) => {
//     switch(action.type) {
//         case LOAD_PRODUCT_IMAGES: {
//             const newState = {}
//             action.images.images.forEach(image => {
//                 newState[image.id] = image
//             })
//             return newState
//         }
//         default:
//             return state
//     }
// }

// export default imageReducer
