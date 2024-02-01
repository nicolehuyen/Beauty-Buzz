import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './AllProducts.css'
import ProductTile from './ProductTile'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'
import { loadProductImagesThunk } from '../../redux/image'

function AllProducts() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const users = useSelector(state => state.user)
    const images = useSelector(state => state.image)
    const imagesObj = Object.values(images)
    const productKeys = Object.keys(products)
    console.log('imagesIMAGESSS', )

    useEffect(() => {
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
        dispatch(loadProductImagesThunk())
    }, [dispatch])

    return (
        <section className='all-products-section'>
            <div className='products-container'>
                {users && images && productKeys.map((id) => (
                    <ProductTile key={id} product={products[id]} seller={users[products[id]['seller_id']]} image={images[products[id]['product_id']]}/>
                ))}
            </div>
        </section>
    )
}

export default AllProducts
